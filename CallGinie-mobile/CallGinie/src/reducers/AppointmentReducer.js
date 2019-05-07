const INITIAL_STATE = {
    appointmentDetails: null,
    isAppointmentAccepted: false
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
                isAppointmentAccepted: true
            }
        case types.REJECT_APPOINTMENT:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}