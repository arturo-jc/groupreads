import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";
import bookReducer from "./bookReducer";
import recordReducer from "./recordReducer";

export default combineReducers({
    auth: authReducer,
    group: groupReducer,
    book: bookReducer,
    record: recordReducer
});