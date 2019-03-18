const INITIAL_STATE = {
    isRegisterSuccessfully:false,
    error:""

};
import   * as types from "../actions/types"

export default function RegisterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.REGISTER:
            return{
                ...state,
                isRegisterSuccessfully:!state.isRegisterSuccessfully,
            }
        case types.REGISTER_ERROR:
            return{
                ...state,
                isRegisterSuccessfully:!state.isRegisterSuccessfully,
                error:"error"
            }
        default:
            return state
    }

}
