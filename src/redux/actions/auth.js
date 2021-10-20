import axios from "axios";
export const postLogin = (url, data) => {
  return {
    type: "POST_LOGIN",
    payload: axios.post(url, data),
  };
};
export const postRegister = (url, data) => {
  return {
    type: "POST_REGISTER",
    payload: axios.post(url, data),
  };
};
export const postSendOTP = (url, data) => {
  return {
    type: "POST_sendOTP",
    payload: axios.post(url, data),
  };
};
export const postVerifyOTP = (url, data) => {
  return {
    type: "POST_verifyOTP",
    payload: axios.post(url, data),
  };
};
export const postResetPassword = (url, data, token) => {
  return {
    type: "POST_RESET_PASSWORD",
    payload: axios.post(url, data, {
      headers: {
        "auth-token": token,
      },
    }),
  };
};
export const postLogout = (url, token) => {
  return {
    type: "POST_LOGOUT",
    payload: axios.post(
      url,
      {},
      {
        headers: {
          "auth-token": token,
        },
      }
    ),
  };
};
