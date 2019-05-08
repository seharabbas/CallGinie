const INITIAL_STATE = {
    appointmentDetails: null,
    isAppointmentAccepted: false,
    appointmentID:0,
    isLocationReached:false
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
        default:
            return state;
    }
}