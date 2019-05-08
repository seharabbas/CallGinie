
import * as NetworkActions from "./NetworkActions";
import * as types from "./types"
import { DropDownHolder } from '../components/common/DropDownHolder';
import moment from "moment";
export function setAppointment(appointment) {
    return function (dispatch, getState) {
        let appointmentDetail = {
            location: {
                latitude: appointment.latitude,
                longitude: appointment.longitude
            },
            customerName: appointment.customerName,
            carOwnerId: appointment.carOwnerId,
            customerRating: appointment.customerRating,
            carServices: appointment.carServices,
            serviceIds: appointment.serviceIds,
            phoneNo: appointment.phoneNo
        };
        dispatch({
            type: types.GET_APPOINTMENT,
            payload: {
                appointment: appointmentDetail
            }
        });
    }
}
/*"location": {
		"longitude": 74.342526,
		"latitude": 31.515031
	},
	"workshopOwnerId": 12,
	"AppointmentDate": "31/01/2019",
	"AppointmentTime": "10:00 PM",
	"TotalDistance": "10",
	"serviceIds": [5, 4, 3],
	"carOwnerId": "11"
}
*/
export function acceptAppointment(distanceTravelled) {
    return function (dispatch, getState) {
        let appointment = getState().AppointmentReducer.appointmentDetails;
        let appointmentDate = moment().format('DD/MM/YYYY');
        let appointmentTime = moment().format('hh:mm a');
        let workshopOwnerId = getState().AuthReducer.customer.WO_Id;

        let appointmentDetail = {
            location: appointment.location,
            carOwnerId: appointment.carOwnerId,
            AppointmentDate: appointmentDate,
            AppointmentTime: appointmentTime,
            TotalDistance: distanceTravelled,
            serviceIds: appointment.serviceIds,
            workshopOwnerId: workshopOwnerId
        }
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "COwner/acceptRequest",
            data: appointmentDetail
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                let appointmentID = parseInt(response.data.iApptid);
                dispatch({ type: types.ACCEPT_APPOINTMENT, payload: { appointmentID: appointmentID } });
            }).catch(function (error) {
                dispatch({ type: types.REJECT_APPOINTMENT });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Failed to reject your appointment.");

            })
    }
}

export function rejectAppointment() {
    return function (dispatch, getState) {
        dispatch({ type: types.REJECT_APPOINTMENT });
    }
}


export function updateMechanicLocation(mechanicLocation) {
    return function (dispatch, getState) {
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "COwner/updateWorkshopOwnerLocation",
            data: mechanicLocation
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
            }).catch(function (error) {
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Failed to send your location.");

            })

    }
}

export function updateMechanicLocationStatus(){
    return function (dispatch, getState) {
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "COwner/mechanicReach",
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                dispatch({type:types.REACHED_LOCATION})
            }).catch(function (error) {
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Failed to send your location.");

            })
    }
}