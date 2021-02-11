/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DropdownProductGroup from "../components/DropdownProductGroup";
import { useSelector, useDispatch } from "react-redux";
import * as productRedux from "../_redux/ProductRedux";
// import axios from "axios";
// import * as swal from "../../Common/components/SweetAlert";

function Product() {
  const dispatch = useDispatch();
  const productReducer = useSelector(({ product }) => product);

  //   const validateLastName = (input) => {
  //     return input === "salmon";
  //   };

  //   const getVersion = async () => {
  //     let result;
  //     await axios
  //       .get("http://uat.siamsmile.co.th:9188/api/clientversion")
  //       .then((res) => {
  //         result = res.data.data.clientVersion;
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //       });
  //     return result;
  //   };

  return (
    <Formik
      enableReinitialize
      //Form fields and default values
      initialValues={{
        id: productReducer.currentProductToAdd.id,
        name: productReducer.currentProductToAdd.name,
        price: productReducer.currentProductToAdd.price,
        stock: productReducer.currentProductToAdd.stock,
        productGroupId: productReducer.currentProductToAdd.productGroupId,
      }}
      //Validation section
      validate={async (values) => {
        const errors = {};
        //Validate form

        // if (!values.titleId) {
        //   errors.titleId_isError = true;
        //   errors.titleId_errorText = "Required";
        // }

        // if (!values.firstName) {
        //   errors.firstName = "Required";
        // }

        // if (!validateLastName(values.lastName)) {
        //   errors.lastName = "Please put salmon";
        // }

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={async (values, { setSubmitting }) => {
        //validate api -- duplicate code
        // let version = await getVersion();
        // if (values.employeeCode === version) {
        //   swal.swalError("Error", "duplicate code");
        //   return;
        // }

        // Save data to redux
        // clone & update value
        let objPayload = {
          ...productReducer.currentProductToAdd,
          id: values.id,
          name: values.name,
          price: values.price,
          stock: values.stock,
          productGroupId: values.productGroupId,
        };

        // save to redux
        dispatch(productRedux.actions.updateProduct(objPayload));

        // dispatch(
        //     productRedux.actions.setCurrentPage(employeeReducer.currentPage + 1)
        // );

        setSubmitting(false);
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
              {isSubmitting && <LinearProgress />}
              <Grid item xs={3} lg={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Next
                  <NavigateNextIcon></NavigateNextIcon>
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
