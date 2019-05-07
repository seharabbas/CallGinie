
import * as NetworkActions from "./NetworkActions";
import * as types from "./types"
import { DropDownHolder } from '../components/common/DropDownHolder';

export function setAppointment(appointment) {
    return function (dispatch, getState) {
            dispatch({
                type:types.GET_APPOINTMENT,
                payload:{ 
                    appointment:appointment
                }
            });
    }
}
