const INITIAL_STATE = {
    isLoggedIn:"",
    userType:""
    ,customer:null
};
import   * as types from "../actions/types"

export default function AuthReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return{
                ...state,
                isLoggedIn:"true",
                userType:action.payload.userRole
            }
        case types.LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn:"false",
            }
        default:
            return state
    }

}
