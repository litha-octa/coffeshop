const intialState = {
    results: {},
    info: {},
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    isLogin: false,
    isReset: false,
    expiry: null,
    err: {},
};
const auth = (state = intialState, { type, payload }) => {
    switch (type) {
        case 'POST_LOGIN_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_LOGIN_FULFILLED':
            const now = new Date();
            return {
                ...state,
                isFulfilled: true,
                isLogin: true,
                isPending: false,
                results: payload.data.data,
                info: {
                    code: payload.data.code,
                    success: payload.data.success,
                    message: payload.data.message,
                },
                expiry: now.getTime() + 60000,
                err: {},
            };
        case 'POST_LOGIN_REJECTED':
            return {
                ...state,
                isRejected: true,
                isPending: false,
                err: payload,
            };
        case 'POST_LOGOUT_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_LOGOUT_FULFILLED':
            return {
                ...state,
                isFulfilled: false,
                isLogin: false,
                isPending: false,
                results: payload.data.data,
                info: {},
                err: {},
            };
        case 'POST_LOGOUT_REJECTED':
            return {
                ...state,
                isRejected: true,
                isPending: false,
                err: payload,
                isLogin: false,
                info: {},
            };
        case 'POST_sendOTP_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_sendOTP_FULFILLED':
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
        case 'POST_sendOTP_REJECTED':
            return {
                ...state,
                isRejected: true,
                isPending: false,
                err: payload,
            };
        case 'POST_verifyOTP_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_verifyOTP_FULFILLED':
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
        case 'POST_verifyOTP_REJECTED':
            return {
                ...state,
                isRejected: true,
                isPending: false,
                err: payload,
            };
        case 'POST_RESET_PASSWORD_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_RESET_PASSWORD_FULFILLED':
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                isReset: true,
                results: payload.data.data,
                info: {
                    code: payload.data.code,
                    success: payload.data.success,
                    message: payload.data.message,
                },
            };
        case 'POST_RESET_PASSWORD_REJECTED':
            return {
                ...state,
                isRejected: true,
                isPending: false,
                err: payload,
            };
        case 'POST_REGISTER_PENDING':
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_REGISTER_FULFILLED':
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
        case 'POST_REGISTER_REJECTED':
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
export default auth;
