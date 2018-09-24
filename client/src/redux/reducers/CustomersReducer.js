import { RECIEVE_CUSTOMERS } from "redux/constants";

const INITIAL_STATE = {
  customers: [],
  total: 0
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
    default:
      return state;
  }
};

export default CustomersReducer;
