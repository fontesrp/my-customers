import { combineReducers } from "redux";

import CustomersReducer from "./CustomersReducer";

const rootReducer = combineReducers({
  customers: CustomersReducer
});

export default rootReducer;
