import auth from "./auth";
import user from "./user";
import transaction from "./transaction";
import history from './history';
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "user"],
};

const allReducer = combineReducers({
    auth,
    user,
    transaction,
    history,
});
export default persistReducer(persistConfig, allReducer);
