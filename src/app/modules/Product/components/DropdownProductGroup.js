/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";

import * as productAxios from "../_redux/ProductAxios";

function DropdownProductGroup(props) {
  //   const title_api_url = `${CONST.API_URL}/Workshop/title`;

  const [productGroup, setproductGroup] = React.useState([]);

  React.useEffect(() => {
    productAxios
      .getProductGroup()
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setproductGroup(res.data.data);
        } else {
          //internal error
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //physical error
        alert(err.message);
      });
  }, []);

  return (
    <FormControl
      fullWidth
      error={
        props.errors[`${props.name}_isError`] && props.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor="productGroupId-simple">{props.label}</InputLabel>
      <Field
        component={Select}
        name={props.name}
        inputProps={{
          id: "productGroupId-simple",
        }}
      >
        <MenuItem disabled value={0}>
          กรุณาเลือก
        </MenuItem>
        {productGroup.map((item) => (
          <MenuItem key={`${props.name}_${item.id}`} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Field>
      {props.touched[`${props.name}`] && (
        <FormHelperText>
          {props.errors[`${props.name}_errorText`]}
        </FormHelperText>
      )}
    </FormControl>
  );
}

DropdownProductGroup.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

// Same approach for defaultProps too
DropdownProductGroup.defaultProps = {
  touched: {},
  values: {},
  errors: {},
  name: "",
  label: "",
};

export default DropdownProductGroup;
