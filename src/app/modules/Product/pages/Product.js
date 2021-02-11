/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
// import EmployeePage1 from "../components/EmployeePage1";
// import EmployeePage2 from "../components/EmployeePage2";
// import EmployeePage3 from "../components/EmployeePage3";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
// import * as employeeAxios from "../_redux/employeeAxios";
// import * as employeeRedux from "../_redux/employeeRedux";
import * as swal from "../../Common/components/SweetAlert";
import * as commonFunctions from "../../Common/functions/CommonFunctions";

import * as productAxios from "../_redux/ProductAxios";
import * as productRedux from "../_redux/ProductRedux";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function Product(props) {
  const classes = useStyles();
  const productReducer = useSelector(({ product }) => product);
  // const [steps] = React.useState(["Page1", "Page2", "Page3", "Page4"]);

  let { id } = useParams();

  const dispatch = useDispatch();

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

            // // get province district subDistrict
            // let provinceObject = await commonFunctions.getSubDistrictDetail(
            //   apiData.subDistrict.subDistrictId
            // );

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

  // function getStepContent(step) {
  //   switch (step) {
  //     case 0:
  //       return (
  //         <div>
  //           <EmployeePage1 history={props.history}></EmployeePage1>
  //         </div>
  //       );
  //     case 1:
  //       return (
  //         <div>
  //           <EmployeePage2 history={props.history}></EmployeePage2>
  //         </div>
  //       );
  //     case 2:
  //       return (
  //         <div>
  //           <EmployeePage3 history={props.history}></EmployeePage3>
  //         </div>
  //       );
  //     case 3:
  //       return (
  //         <div>
  //           <EmployeePage4 history={props.history}></EmployeePage4>
  //         </div>
  //       );
  //     default:
  //       return "Unknown step";
  //   }
  // }

  return (
    <div>
      <Product history={props.history}></Product>
    </div>
  );
}

export default Product;
