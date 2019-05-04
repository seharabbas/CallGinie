const INITIAL_STATE = {
   isServiceBooked:false,
   error:""

};
import   * as types from "../actions/types"

export default function BookServiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.BOOK_SERVICE:
            return{
                ...state,
                isServiceBooked:true,
                error:""
            }
        case types.BOOK_SERVICE_ERROR:
            return{
                ...state,
                isServiceBooked:!state.isServiceBooked,
                error:"error"
            }
        default:
            return state;
    }

}
