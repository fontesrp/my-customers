import { RECIEVE_CUSTOMERS } from "redux/constants";
import Api from "utils/api";

export const fetchCustomers = ({ startIndex, stopIndex }) => (dispatch) =>
  Api.get(`/customers?start=${startIndex}&stop=${stopIndex}`).then((response) =>
    dispatch({
      type: RECIEVE_CUSTOMERS,
      payload: response
    })
  );
