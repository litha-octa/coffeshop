import axios from "axios";
export const getTransaction = (url, token) => {
  return {
    type: "GET_TRANSACTION",
    payload: axios.get(url, {
      headers: {
        "auth-token": token,
      },
    }),
  };
};
export const payTransaction = (url, data, token) => {
  return {
    type: "PAY_TRANSACTION",
    payload: axios.patch(url, data, {
      headers: {
        "auth-token": token,
      },
    }),
  };
};
