import { combineReducers } from 'redux';
import RegisterReducer from "./RegisterReducer";
import AuthReducer from "./AuthReducer";


export default combineReducers({
    RegisterReducer,
    AuthReducer
});