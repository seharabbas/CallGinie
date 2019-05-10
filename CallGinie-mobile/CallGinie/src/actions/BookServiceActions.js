
import * as NetworkActions from "./NetworkActions";
import * as types from "./types"
import { DropDownHolder } from '../components/common/DropDownHolder';





export function bookAService(bookServiceObj) {
    return function (dispatch, getState) {
        let userID = getState().AuthReducer.customer.U_id;
   
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "COwner/bookARide",
            data: bookServiceObj
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                dispatch({ type: types.BOOK_SERVICE });
            }).catch(function (error) {
                dispatch({ type: types.BOOK_SERVICE_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Failed to find you any workshops.");

            })
    }
}

export function bookAServiceInAdvance(bookServiceObj) {
    return function (dispatch, getState) {
        let userID = getState().AuthReducer.customer.U_id;
   
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "COwner/bookAnAppointmentinAdvance",
            data: bookServiceObj
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                DropDownHolder.getDropDown().alertWithType('success', 'Schedule Appointment', "Your appointment is successfully scheduled");

                dispatch({ type: types.BOOK_SERVICE_IN_ADVANCE });
            }).catch(function (error) {
                dispatch({ type: types.BOOK_SERVICE_IN_ADVANCE_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Could not book you your appointment.");

            })
    }
}

export function setWorkshopDetailsForAppointment(workshopDetail) {
    return function (dispatch, getState) {
        let workshop = {
            name: workshopDetail.workshopName,
            estimatedCost: workshopDetail.estimatedCost,
            rating: workshopDetail.rating,
            phoneNumber:workshopDetail.phoneNumber
        };
        let workshopLocation = {
            longitude: workshopDetail.long,
            latitude: workshopDetail.lat,
            latitudeDelta: 0,
            longitudeDelta: 0.05
        };
        dispatch({
            type: types.SET_APPOINTMENT_DETAILS, payload: {
                workshop: workshop,
                appointmentID: workshopDetail.appointmentID,
                workshopLocation: workshopLocation
            }
        });


    }
}

export function updateWorkshopLocation(location) {
    return function (dispatch, getState) {

        dispatch({
            type: types.UPDATE_WORKSHOP_LOCATION, payload: {
                workshopLocation: {
                    longitude: location.long,
                    latitude: location.lat,
                    latitudeDelta: 0,
                    longitudeDelta: 0.05
                }
            }
        });
    }
}
export function onMechanicReached() {
    return function (dispatch, getState) {
        dispatch({ type: types.MECHANIC_REACHED });
    }

}

export function endService(appointmentID){
    return function (dispatch, getState) {
        let bookServiceAppointmentID=getState().BookServiceReducer.appointmentID;
        if(appointmentID==bookServiceAppointmentID){
            dispatch(getAppointment());
        }
    }
}

export function getAppointment() {
    return function (dispatch, getState) {
        let appointmentID = 1;//getState().BookServiceReducer.appointmentID;
        let isDevMode = false;
        let axiosParams = {
            method: "GET",
            url: "COwner/generateBill?iApptid=" + appointmentID,
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                let data = response.data;

                dispatch({
                    type: types.SET_RECEIPT
                    , payload: { appointment: data.results }
                });
            }).catch(function (error) {
                dispatch({ type: types.BOOK_SERVICE_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'Receipt Error', "Sorry, Failed to fetch the receipt");
             })
    }
}

export function resetBookAppointment(){
    return function (dispatch, getState) {
    dispatch({
        type: types.RESET_APPOINTMENT
    });
}
}

export function rateWorkshop(mechanicRating,appointmentID){
    return function (dispatch, getState) {
       let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "COwner/rateWorkshopOwner",
            data:{
                iApptid:appointmentID,
                rating:mechanicRating
            }
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                let data = response.data;
            }).catch(function (error) {
                DropDownHolder.getDropDown().alertWithType('error', 'Rating Error', "Sorry, Failed to rate this workshop");
             })
    }
}