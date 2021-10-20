import axios from "axios";
export const getHistory = (url, token) => {
  return {
    type: "GET_HISTORY",
    payload: axios.get(url, {
      headers: {
        "auth-token": token,
      },
    }),
  };
};
export const deleteHistory = (url, token, data) => {
  return {
    type: "DELETE_HISTORY",
    payload: axios.delete(url, data, {
      headers: {
        "auth-token": token,
      },
    }),
  };
};
