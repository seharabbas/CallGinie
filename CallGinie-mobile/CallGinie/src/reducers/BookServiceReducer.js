const INITIAL_STATE = {
   isServiceBooked:false,
   error:"",
   workshop:null,
   workshopLocation:null,
   appointmentID:-1,
   hasMechanicReached:false,
   receipt:null
};
import   * as types from "../actions/types"

export default function BookServiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.BOOK_SERVICE:
            return{
                ...state,
                isServiceBooked:!state.isServiceBooked,
                error:""
            }
        case types.BOOK_SERVICE_ERROR:
            return{
                ...state,
                isServiceBooked:!state.isServiceBooked,
                error:"error"
            };
        case types.SET_APPOINTMENT_DETAILS:
            return{
                ...state,
                workshop:action.payload.workshop,
                workshopLocation:action.payload.workshopLocation,
                appointmentID:action.payload.appointmentID
            };
        case types.UPDATE_WORKSHOP_LOCATION:
        return{
            ...state,
            workshopLocation:action.payload.workshopLocation,
        };
        case types.MECHANIC_REACHED:
        return {
            ...state,
            hasMechanicReached:true
        }
        case types.SET_RECEIPT:
        return{
            ...state,
            receipt:action.payload.appointment
        }
       
        default:
            return state;
    }

}
