
import * as NetworkActions from "./NetworkActions";
import * as types from "./types"
import { DropDownHolder } from '../components/common/DropDownHolder';


export function getCarServices() {
    return function (dispatch, getState) {
        let isDevMode = false;
        let axiosParams = {
            method: "GET",
            url: "COwner/getCarServices",
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                let data = response.data.results;
                let i = 0;
                let carServices = [];
                for (; i < data.length; i++) {
                    carServices.push({
                        label: data[i].ServiceName,
                        value: data[i].C_id,
                        amount: data[i].ServiceCharges
                    });
                }
                dispatch({
                    type: types.GET_SERVICE_LIST,
                    payload: { services: carServices }
                });
            }).catch(function (error) {
                dispatch({ type: types.GET_SERVICE_LIST_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

            });
    }
}

export function getWorkshopServices(){
    return function (dispatch, getState) {
        let workhopOwnerID = getState().AuthReducer.customer.WO_Id;
        let isDevMode = false;
        let axiosParams = {
            method: "GET",
            url: "COwner/getWorkshopServices",
            params:{
                "WorkshopOwnerId":workhopOwnerID
            }
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                let data = response.data;
                let i = 0;
                let carServices = [];
                for (; i < data.length; i++) {
                    carServices.push({
                        label: data[i].ServiceName,
                        value: data[i].C_id,
                        amount: data[i].ServiceCharges
                    });
                }
                dispatch({
                    type: types.GET_WORKSHOP_SERVICE_LIST,
                    payload: { services: carServices }
                });
            }).catch(function (error) {
                dispatch({ type: types.GET_SERVICE_LIST_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

            });
    }
    
}

export function addWorkshopServices(carServices){
    return function (dispatch, getState) {
        let workshopOwnerID = getState().AuthReducer.customer.WO_Id;
        let isDevMode=false;
        let data={
            workshopOwnerID:workshopOwnerID,
            serviceIds:carServices
        };
        let axiosParams = {
            method: "POST",
            url: "COwner/AddBulkWorkshopServices",
            data:data
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
        .then(function (response) {
            dispatch({ type: types.ADD_WORKSHOP_SERVICES });
        }).catch(function (error) {
                dispatch({ type: types.ADD_WORKSHOP_SERVICES_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

        })
    }
}
