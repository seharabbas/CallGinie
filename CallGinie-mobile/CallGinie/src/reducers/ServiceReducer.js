const INITIAL_STATE = {
   services:[],
   error:""
};
import   * as types from "../actions/types"

export default function ServiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_SERVICE_LIST:
            return{
                ...state,
                services:action.payload.services
            }
            case types.GET_SERVICE_LIST_ERROR:
            return{
                ...state,
                error:"error",
            }
        default:
            return state
    }

}
