const INITIAL_STATE = {
    appointmentDetails: null,
    isAppointmentAccepted: false,
    appointmentID:0,
    isLocationReached:false,
    isBillGenerated:false,
    receipt:null
};
import * as types from "../actions/types";


export default function AppointmentReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_APPOINTMENT:
            return {
                ...state,
                appointmentDetails: action.payload.appointment
            }
        case types.ACCEPT_APPOINTMENT:
            return {
                ...state,
                isAppointmentAccepted: true,
                appointmentID:action.payload.appointmentID

            }
        case types.REJECT_APPOINTMENT:
            return {
                ...state,
                ...INITIAL_STATE
            }
        case types.REACHED_LOCATION:
        return {
            ...state,
            isLocationReached:true
        }
        case types.GENERATE_BILL:
        return{
            ...state,
            isBillGenerated:true,
            receipt:action.payload.receipt
        }
        case types.RESET_APPOINTMENT:
        return{
            ...state,
            ...INITIAL_STATE
        }
        // case types.SAVE_RECEIPT:
        // return{
        //     ...state,
        //     receipt:action.payload.receipt
        // }
        case types.LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}