import { combineReducers } from 'redux';
import RegisterReducer from "./RegisterReducer";
import AuthReducer from "./AuthReducer";
import ServiceReducer from "./ServiceReducer";
import WorkshopServicesReducer from "./WorkshopServiceReducer";
import BookServiceReducer from "./BookServiceReducer";

export default combineReducers({
    RegisterReducer,
    AuthReducer,
    ServiceReducer,
    WorkshopServicesReducer,
    BookServiceReducer
});