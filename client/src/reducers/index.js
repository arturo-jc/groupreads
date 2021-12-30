import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";
import searchReducer from "./searchReducer";
import recordReducer from "./recordReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import markerReducer from "./markerReducer";
import bookmarkReducer from "./bookmarkReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
    auth: authReducer,
    group: groupReducer,
    search: searchReducer,
    record: recordReducer,
    post: postReducer,
    comment: commentReducer,
    marker: markerReducer,
    bookmark: bookmarkReducer,
    alert: alertReducer
});