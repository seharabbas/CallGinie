const INITIAL_STATE = {
   services:[],
   error:"",
   isLoaded:false
};
import   * as types from "../actions/types"

export default function ServiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_SERVICE_LIST:
            return{
                ...state,
                services:action.payload.services,
                isLoaded:true
            }
            case types.GET_SERVICE_LIST_ERROR:
            return{
                ...state,
                error:"error",
                isLoaded:true
            }
            case types.LOGOUT:
                return INITIAL_STATE;
        default:
            return state
    }

}
