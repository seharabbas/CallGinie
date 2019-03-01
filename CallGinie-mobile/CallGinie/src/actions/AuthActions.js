

import * as NetworkActions from "./NetworkActions";
import   * as types from "./types"
import { DropDownHolder } from '../components/common/DropDownHolder';

export function registerWorkshop(workshop){
    return function (dispatch, getState) {
        
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "/CLogin/addWorkshopOwner",
            data: {
                Username:workshop.email,
                Password:workshop.password,
                FullName:workshop.fullName,
                CNIC:workshop.cnic,
                PhoneNo:workshop.phone,
                Email:workshop.email,
                WorkshopName:workshop.workshopName,
                Latitude:"",
                Longitude:""
            }
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                dispatch({ type: types.REGISTER });
                DropDownHolder.getDropDown().alertWithType('success', 'success', "Registered Successfully");
            }) .catch(function (error) {
                dispatch({ type: types.REGISTER_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

            });
    }
}


export function registerCustomer(customer){
    return function (dispatch, getState) {
        
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "/CLogin/addCarOwner",
            data: {
                Username:customer.email,
                Password:customer.password,
                FullName:customer.fullName,
                PhoneNo:customer.phone,
                Email:customer.email,
                CNIC:""
            }
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                dispatch({ type: types.REGISTER });
                DropDownHolder.getDropDown().alertWithType('success', 'success', "Registered Successfully");
            }) .catch(function (error) {
                dispatch({ type: types.REGISTER_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

            });
    }
}