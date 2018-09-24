import {
  RECIEVE_CUSTOMERS,
  RESET_CUSTOMERS,
  SET_SEARCH,
  CLEAN_SEARCH,
  SET_ORDER_BY,
  CLEAN_ORDER_BY
} from "redux/constants";
import Api from "utils/api";

const constructQuery = (obj) =>
  Object.keys(obj).reduce(
    (query, field) =>
      `${query}${!!query ? "&" : ""}${`${encodeURIComponent(
        field
      )}=${encodeURIComponent(obj[field])}`}`,
    ""
  );

export const fetchCustomers = ({
  startIndex,
  stopIndex,
  search,
  orderBy,
  type = RECIEVE_CUSTOMERS
}) => (dispatch, getState) => {
  const state = getState();

  const pageQuery = constructQuery({
    start: startIndex,
    stop: stopIndex
  });

  // If no search spec was provided, get it from the state
  const _search = search || state.customers.search;

  // Send search query only if there are search specs
  const searchQuery = Object.values(_search).some((val) => !!val)
    ? constructQuery({ search: JSON.stringify(_search) })
    : "";

  // Same thing for orderBy
  const _orderBy = orderBy === undefined ? state.customers.orderBy : orderBy;

  const orderByQuery = _orderBy ? constructQuery({ orderBy: _orderBy }) : "";

  // The final query will be the three combined
  const query = `${pageQuery}${!!searchQuery ? `&${searchQuery}` : ""}${
    !!orderByQuery ? `&${orderByQuery}` : ""
  }`;

  return Api.get(`/customers?${query}`).then((response) =>
    dispatch({
      type,
      payload: response
    })
  );
};

export const resetCustomers = (data) => (dispatch) =>
  dispatch(
    fetchCustomers({
      ...data,
      startIndex: 0,
      stopIndex: 30,
      type: RESET_CUSTOMERS
    })
  );

export const searchCustomers = (fields) => (dispatch) => {
  dispatch({ type: SET_SEARCH, payload: fields });

  return dispatch(resetCustomers({ search: fields }));
};

export const resetSearch = () => (dispatch) => {
  dispatch({ type: CLEAN_SEARCH });

  return dispatch(resetCustomers({ search: {} }));
};

export const orderCustomersBy = (field) => (dispatch) => {
  dispatch({ type: SET_ORDER_BY, payload: field });

  return dispatch(resetCustomers({ orderBy: field }));
};

export const resetOrderBy = () => (dispatch) => {
  dispatch({ type: CLEAN_ORDER_BY });

  return dispatch(resetCustomers({ orderBy: "" }));
};

export const editCustomer = (data) => (dispatch) =>
  Api.put(`/customers/${data.id}`, data);

export const editNote = (data) => (dispatch) =>
  Api.put(`/notes/${data.id}`, data);
