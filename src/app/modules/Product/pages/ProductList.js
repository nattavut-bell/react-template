import React from "react";
import ProductTable from "../components/ProductTable";

function ProductList(props) {
  return (
    <div>
      <div>
        <ProductTable history={props.history}></ProductTable>
      </div>
    </div>
  );
}

export default ProductList;
