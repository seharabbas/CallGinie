const INITIAL_STATE = {
    isLoggedIn:"",
    userType:""
    ,customer:null,
    isAlreadyLoggedIn:false,
    playerID:""
};
import   * as types from "../actions/types"

export default function AuthReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return{
                ...state,
                isLoggedIn:"true",
                userType:action.payload.userRole,
                customer:action.payload.customer
            }
        case types.LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn:"false",
            }
        case  types.IS_ALREADY_LOGGEDIN:
        return{
            ...state,
            isLoggedIn:action.payload.customer == null?"":"true",
            userType:action.payload.userRole,
            customer:action.payload.customer,
            isAlreadyLoggedIn:true
        }
        case types.SET_PLAYER_ID:
            return {
                ...state,
                playerID:action.payload.playerID
            
            }
        case types.LOGOUT:
            return INITIAL_STATE;
        default:
            return state
    }

}
