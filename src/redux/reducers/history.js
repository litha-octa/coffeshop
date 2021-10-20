const intialState = {
  results: {},
  info: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};

const historyReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case "GET_HISTORY_PENDING":
      return {
        ...state,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case "GET_HISTORY_FULFILLED":
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        results: payload.data.data,
      };
    case "GET_HISTORY_REJECTED":
      return {
        ...state,
        isRejected: true,
        isPending: false,
        err: payload,
      };

    case "DELETE_HISTORY_PENDING":
      return {
        ...state,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case "DELETE_HISTORY_FULFILLED":
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
      };
    case "DELETE_HISTORY_REJECTED":
      return {
        ...state,
        isRejected: true,
        isPending: false,
        err: payload,
      };
    default:
      return state;
  }
};
export default historyReducer;
