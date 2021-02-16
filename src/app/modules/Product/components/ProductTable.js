/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import MUIDataTable from "mui-datatables";
import * as productAxios from "../_redux/ProductAxios";
import Grid from "@material-ui/core/Grid";
import ProductTableSearch from "./ProductTableSearch";
import AddProduct from "./Add";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import * as swal from "../../Common/components/SweetAlert";

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductTable(props) {
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      searchDetail: "",
    },
  });

  const [totalRecords, setTotalRecords] = React.useState(0);

  const [data, setData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //load data from api
    loadData();
  }, [paginated]);

  const handleDelete = (id) => {
    //confirm
    swal.swalConfirm("Confirm delete?", `Confirm delete ${id}?`).then((res) => {
      if (res.isConfirmed) {
        //delete
        productAxios
          .deleteProduct(id)
          .then((res) => {
            if (res.data.isSuccess) {
              //reload
              swal.swalSuccess("Success", `Delete ${id} success.`).then(() => {
                loadData();
              });
            } else {
              swal.swalError("Failure", `${res.data.message}`);
            }
          })
          .catch((err) => {
            //network error
            swal.swalError("Error", err.message);
          });
      }
    });
  };

  const handleEdit = (id) => {
    props.history.push(`/product/edit/${id}`);
  };

  const handleAdd = () => {
    props.history.push(`/product/new`);
  };

  const handleSearch = (values) => {
    setPaginated({
      ...paginated,
      page: 1,
      searchValues: values,
    });
  };

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "productGroup.name",
      label: "Group",
      option: {
        sort: false,
      },
    },
    {
      name: "name",
      label: "Name",
      option: {
        sort: false,
      },
    },
    {
      name: "price",
      label: "Price",
      option: {
        sort: false,
      },
    },
    {
      name: "stock",
      label: "Stock",
      option: {
        sort: false,
      },
    },
    {
      name: "createdByUser.username",
      label: "CreatedBy",
      option: {
        sort: false,
      },
    },
    {
      name: "CreatedDate",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {dayjs(data[dataIndex].createdDate).format("DD/MM/YYYY HH:mm")}
            </Grid>
          );
        },
      },
    },
    {
      name: "Status",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{
                padding: 0,
                margin: 0,
                color: data[dataIndex].isActive ? "green" : "red",
              }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {/* {data[dataIndex].isActive.toString()} */}

              {data[dataIndex].isActive ? "Active" : "Deleted"}
            </Grid>
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <EditButton
                style={{ marginRight: 5 }}
                onClick={() => {
                  handleEdit(data[dataIndex].id);
                }}
              >
                Edit
              </EditButton>
              <DeleteButton
                onClick={() => {
                  handleDelete(data[dataIndex].id);
                }}
              >
                Delete
              </DeleteButton>
            </Grid>
          );
        },
      },
    },
  ];

  const loadData = () => {
    setIsLoading(true);
    productAxios
      .getProductFilter(
        paginated.orderingField,
        paginated.ascendingOrder,
        paginated.page,
        paginated.recordsPerPage,
        paginated.searchValues.searchDetail
      )
      .then((res) => {
        if (res.data.isSuccess) {
          //flatten data
          if (res.data.totalAmountRecords > 0) {
            let flatData = [];
            res.data.data.forEach((element) => {
              flatData.push(flatten(element));
            });
            setData(flatData);
          }
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    search: false,
    selectableRows: "none",
    serverSide: true,
    count: totalRecords,
    page: paginated.page - 1,
    rowsPerPage: paginated.recordsPerPage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setPaginated({ ...paginated, page: tableState.page + 1 });
          break;
        case "sort":
          setPaginated({
            ...paginated,
            orderingField: `${tableState.sortOrder.name}`,
            ascendingOrder:
              tableState.sortOrder.direction === "asc" ? true : false,
          });
          break;
        case "changeRowsPerPage":
          setPaginated({
            ...paginated,
            recordsPerPage: tableState.rowsPerPage,
          });
          break;
        default:
        //  console.log(`action not handled. [${action}]`);
      }
    },
  };

  return (
    <div>
      {/* search */}
      <ProductTableSearch
        submit={handleSearch.bind(this)}
        // submit={setSearchValues.bind(this)}
      ></ProductTableSearch>
      {/* <AddProduct submit={handleAdd.bind(this)}></AddProduct> */}
      <MUIDataTable
        title={
          <Typography variant="h6">
            Product
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
      />
      {/* {JSON.stringify(data)} */}
    </div>
  );
}

export default ProductTable;
