const intialState = {
    results: {},
    info: {},
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    isUpdated: false,
    err: {},
};
const user = (state = intialState, { type, payload }) => {
    switch (type) {
        case 'GET_USER_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                results: payload.data.data,
                info: {
                    code: payload.data.code,
                    success: payload.data.success,
                    message: payload.data.message,
                },
            };
        case 'GET_USER_REJECTED':
            return {
                ...state,
                isRejected: true,
                isPending: false,
                err: payload,
            };
        //PATCH_updateUSER
        case 'PATCH_updateUSER_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
                isUpdated: false,
            };
        case 'PATCH_updateUSER_FULFILLED':
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                isUpdated: true,
                updated: payload.data.data.result.updated,
                info: {
                    code: payload.data.code,
                    success: payload.data.success,
                    message: payload.data.message,
                },
            };
        case 'PATCH_updateUSER_REJECTED':
            return {
                ...state,
                isRejected: true,
                isPending: false,
                err: payload,
            };
        //DELETE_deleteUSER
        case 'DELETE_deleteUSER_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'DELETE_deleteUSER_FULFILLED':
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                results: payload.data.data,
                info: {
                    code: payload.data.code,
                    success: payload.data.success,
                    message: payload.data.message,
                },
            };
        case 'DELETE_deleteUSER_REJECTED':
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
export default user;
