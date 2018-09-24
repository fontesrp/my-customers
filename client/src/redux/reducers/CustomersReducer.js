import {
  RECIEVE_CUSTOMERS,
  RESET_CUSTOMERS,
  SET_SEARCH,
  CLEAN_SEARCH,
  SET_ORDER_BY,
  CLEAN_ORDER_BY
} from "redux/constants";

const INITIAL_STATE = {
  customers: [],
  total: 0,
  search: {},
  orderBy: null
};

const CustomersReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RECIEVE_CUSTOMERS:
      return {
        ...state,
        customers: [...state.customers, ...payload.items],
        total: payload.total
      };
    case RESET_CUSTOMERS:
      return {
        ...state,
        customers: [...payload.items],
        total: payload.total
      };
    case SET_SEARCH:
      return {
        ...state,
        search: { ...payload }
      };
    case CLEAN_SEARCH:
      return {
        ...state,
        search: {}
      };
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: payload
      };
    case CLEAN_ORDER_BY:
      return {
        ...state,
        orderBy: null
      };
    default:
      return state;
  }
};

export default CustomersReducer;
