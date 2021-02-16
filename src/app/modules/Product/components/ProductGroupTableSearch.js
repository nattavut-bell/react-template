/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import AddButton from "../../Common/components/Buttons/AddButton";

function ProductGroupTableSearch(props) {
  let history = useHistory();

  const handleOpen = () => {
    history.push(`/productGroup/new`);
  };

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Search
        </Typography>

        <Formik
          //Form fields and default values
          initialValues={{
            searchDetail: "",
            // firstName: "",
            // lastName: "",
          }}
          //Validation section
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          //Form Submission
          // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            props.submit(values);
          }}
        >
          {/* Render form */}
          {({ submitForm, isSubmitting, values, errors, resetForm }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={3}></Grid>
                <Grid item xs={12} lg={3}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Search"
                    name="searchDetail"
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  {isSubmitting && <LinearProgress />}
                  <Button
                    style={{ marginTop: 10 }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Search
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  lg={3}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <AddButton style={{ marginRight: 5 }} onClick={handleOpen}>
                    {" "}
                    Add
                  </AddButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ProductGroupTableSearch;
