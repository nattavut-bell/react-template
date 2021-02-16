/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DropdownProductGroup from "../components/DropdownProductGroup";
import { useSelector, useDispatch } from "react-redux";
import * as productRedux from "../_redux/ProductRedux";
import * as productAxios from "../_redux/ProductAxios";
import * as swal from "../../Common/components/SweetAlert";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function Product(props) {
  const handleBack = () => {
    props.history.push("/product");
  };

  const dispatch = useDispatch();
  const productReducer = useSelector(({ product }) => product);

  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      //edit
      //get employee from api
      productAxios
        .getProductById(id)
        .then(async (res) => {
          if (res.data.isSuccess) {
            console.log(JSON.stringify(res.data.data));
            let apiData = res.data.data;

            // clone & update value
            let objPayload = {
              ...productReducer.currentProductToAdd,
              id: apiData.id,
              name: apiData.name,
              productGroupId: apiData.productGroup.id,
              price: apiData.price,
              stock: apiData.stock,
            };

            // save to redux
            dispatch(productRedux.actions.updateProduct(objPayload));
          } else {
            swal.swalError("Error", res.data.message);
          }
        })
        .catch((err) => {
          swal.swalError("Error", err.message);
        });
    }
    return () => {
      //reset redux state
      dispatch(productRedux.actions.resetProduct());
    };
  }, [id]);

  const handleAdd = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    productAxios
      .addProduct(objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Add Completed", `Add id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productRedux.actions.resetProduct());
              props.history.push("/product");
            });
        } else {
          //internal error
          // alert(res.data.message)
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //error network
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleEdit = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    console.log(JSON.stringify(objPayload));
    productAxios
      .editProduct(id, objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Edit Completed", `edited id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productRedux.actions.resetProduct());
              props.history.push("/product");
            });
        } else {
          //internal error
          // alert(res.data.message)
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //error network
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      enableReinitialize
      //Form fields and default values
      initialValues={{
        //id: productReducer.currentProductToAdd.id,
        name: productReducer.currentProductToAdd.name,
        price: productReducer.currentProductToAdd.price,
        stock: productReducer.currentProductToAdd.stock,
        productGroupId: productReducer.currentProductToAdd.productGroupId,
      }}
      //Validation section
      validate={async (values) => {
        const errors = {};
        //Validate form

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={async (values, { setSubmitting }) => {
        let confirmMessage = !id ? "Confirm Add?" : "Confirm Edit?";
        swal.swalConfirm("Confirm save?", confirmMessage).then((result) => {
          if (result.isConfirmed) {
            // Save data to redux
            // clone & update value
            let objPayload = {
              ...productReducer.currentProductToAdd,
              //id: values.id,
              name: values.name,
              price: parseInt(values.price),
              stock: parseInt(values.stock),
              productGroupId: values.productGroupId,
            };

            if (!id) {
              //add
              handleAdd({ setSubmitting }, objPayload);
            } else {
              //edit
              handleEdit({ setSubmitting }, objPayload);
            }
          }
        });
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors, touched }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <DropdownProductGroup
                name="productGroupId"
                label="ProductGroup"
                touched={touched}
                errors={errors}
              ></DropdownProductGroup>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Name"
                name="name"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Price"
                name="price"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Stock"
                name="stock"
              />
            </Grid>

            {/* Start Button */}
            <Grid
              container
              style={{ marginTop: 5 }}
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3} lg={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Button
                  fullWidth
                  variant="contained"
                  // color="primary"
                  disabled={isSubmitting}
                  onClick={handleBack}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            {/* End Button */}
          </Grid>
          <br></br>
          values :{JSON.stringify(values)}
          <br></br>
          errors :{JSON.stringify(errors)}
          <br></br>
          touched : {JSON.stringify(touched)}
        </Form>
      )}
    </Formik>
  );
}

export default Product;
