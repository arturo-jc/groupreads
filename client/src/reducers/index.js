import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";
import searchReducer from "./searchReducer";
import recordReducer from "./recordReducer";

export default combineReducers({
    auth: authReducer,
    group: groupReducer,
    search: searchReducer,
    record: recordReducer
});