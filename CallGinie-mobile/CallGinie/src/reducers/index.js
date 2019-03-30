import { combineReducers } from 'redux';
import RegisterReducer from "./RegisterReducer";
import AuthReducer from "./AuthReducer";
import ServiceReducer from "./ServiceReducer";

export default combineReducers({
    RegisterReducer,
    AuthReducer,
    ServiceReducer
});