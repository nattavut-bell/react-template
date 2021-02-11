// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.API_URL}/products`;
const PRODUCTGroup_URL = `${CONST.API_URL}/productGroups`;

export const getProductGroupFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  searchDetail
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    searchDetail,
  };
  return axios.get(encodeURLWithParams(`${PRODUCTGroup_URL}/filter`, payload));
};

export const addProductGroup = (payload) => {
  return axios.post(`${PRODUCTGroup_URL}`, payload);
};

export const editProductGroup = (id, payload) => {
  return axios.put(`${PRODUCTGroup_URL}/${id}`, payload);
};

export const deleteProductGroup = (id) => {
  return axios.delete(`${PRODUCTGroup_URL}/${id}`);
};

export const getProductGroupById = (id) => {
  return axios.get(`${PRODUCTGroup_URL}/${id}`);
};

export const getProductGroup = () => {
  return axios.get(`${PRODUCTGroup_URL}`);
};

export const getProductFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  searchDetail
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    searchDetail,
  };
  return axios.get(encodeURLWithParams(`${PRODUCT_URL}/filter`, payload));
};

export const addProduct = (payload) => {
  return axios.post(`${PRODUCT_URL}`, payload);
};

export const editProduct = (id, payload) => {
  return axios.put(`${PRODUCT_URL}/${id}`, payload);
};

export const deleteProduct = (id) => {
  return axios.delete(`${PRODUCT_URL}/${id}`);
};

export const getProductById = (id) => {
  return axios.get(`${PRODUCT_URL}/${id}`);
};
