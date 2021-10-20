import axios from "axios";
export const getUser = (url, token) => {
  return {
    type: "GET_USER",
    payload: axios.get(url, {
      headers: {
        "auth-token": token,
      },
    }),
  };
};
export const updateUser = (url, token, formData) => {
  return {
    type: "PATCH_updateUSER",
    payload: axios.patch(url, formData, {
      headers: {
        "auth-token": token,
        "Content-Type": "multipart/form-data",
      },
    }),
  };
};
export const deleteUser = (url, token, data) => {
  return {
    type: "DELETE_deleteUSER",
    payload: axios.delete(url, data, {
      headers: {
        "auth-token": token,
      },
    }),
  };
};
