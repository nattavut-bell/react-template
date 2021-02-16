/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DropdownProductGroup from "../components/DropdownProductGroup";
import { useSelector, useDispatch } from "react-redux";
import * as productGroupRedux from "../_redux/ProductGroupRedux";
import * as productAxios from "../_redux/ProductAxios";
import * as swal from "../../Common/components/SweetAlert";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function ProductGroup(props) {
  const handleBack = () => {
    props.history.push("/productGroup");
  };

  const dispatch = useDispatch();
  const productGroupReducer = useSelector(({ productGroup }) => productGroup);

  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      //edit
      //get employee from api
      productAxios
        .getProductGroupById(id)
        .then(async (res) => {
          if (res.data.isSuccess) {
            console.log(JSON.stringify(res.data.data));
            let apiData = res.data.data;

            // clone & update value
            let objPayload = {
              ...productGroupReducer.currentProductGroupToAdd,
              name: apiData.name,
            };

            // save to redux
            dispatch(productGroupRedux.actions.updateProductGroup(objPayload));
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
      dispatch(productGroupRedux.actions.resetProductGroup());
    };
  }, [id]);

  const handleAdd = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    productAxios
      .addProductGroup(objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Add Completed", `Add id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productGroupRedux.actions.resetProductGroup());
              //   props.history.push("/productGroup");
              handleBack();
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
      .editProductGroup(id, objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Edit Completed", `edited id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productGroupRedux.actions.resetProductGroup());
              //   props.history.push("/productGroup");
              handleBack();
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
        name: productGroupReducer.currentProductGroupToAdd.name,
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
              ...productGroupReducer.currentProductGroupToAdd,
              //id: values.id,
              name: values.name,
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
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="ProductGroup"
                name="name"
              />
            </Grid>
            <Grid item xs={12} lg={6}></Grid>

            <Grid item xs={12} lg={6}></Grid>

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

export default ProductGroup;
