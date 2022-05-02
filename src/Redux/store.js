import { legacy_createStore } from "redux";
import { combineReducers } from "redux";
import { loginReducer } from "./reducer";
const reducer = combineReducers({
    loginReducer
});

export const store = legacy_createStore(reducer);
