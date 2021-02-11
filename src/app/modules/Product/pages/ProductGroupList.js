import React from "react";
import ProductGroupTable from "../components/ProductGroupTable";

import DropdownProductGroup from "../components/DropdownProductGroup";

function ProductGroupList(props) {
  return (
    <div>
      <div>
        <ProductGroupTable history={props.history}></ProductGroupTable>
      </div>
    </div>
  );
}

export default ProductGroupList;
