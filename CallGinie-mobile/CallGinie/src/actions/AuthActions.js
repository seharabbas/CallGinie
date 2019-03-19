

import * as NetworkActions from "./NetworkActions";
import * as types from "./types"
import { DropDownHolder } from '../components/common/DropDownHolder';

export function registerWorkshop(workshop) {
    return function (dispatch, getState) {

        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "/CLogin/addWorkshopOwner",
            data: {
                Username: workshop.email,
                Password: workshop.password,
                FullName: workshop.fullName,
                CNIC: workshop.cnic,
                PhoneNo: workshop.phone,
                Email: workshop.email,
                WorkshopName: workshop.workshopName,
                Latitude: "",
                Longitude: ""
            }
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                dispatch({ type: types.REGISTER });
                DropDownHolder.getDropDown().alertWithType('success', 'success', "Registered Successfully");
            }).catch(function (error) {
                dispatch({ type: types.REGISTER_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

            });
    }
}


export function registerCustomer(customer) {
    return function (dispatch, getState) {

        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "/CLogin/addCarOwner",
            data: {
                Username: customer.email,
                Password: customer.password,
                FullName: customer.fullName,
                PhoneNo: customer.phone,
                Email: customer.email,
                CNIC: ""
            }
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                dispatch({ type: types.REGISTER });
                DropDownHolder.getDropDown().alertWithType('success', 'success', "Registered Successfully");
            }).catch(function (error) {
                dispatch({ type: types.REGISTER_ERROR });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

            });
    }
}

function getCustomerProfile(userID,userRole) {
    return new Promise(function (resolve, reject) {
        let url="/CLogin/getCarOwnerProfile?U_id="+userID;
        if(userRole=="workshopowner"){
            url="/CLogin/getWorkshopOwnerProfile?U_id="+userID
        }
        let isDevMode = false;
        let axiosParams = {
            method: "GET",
            url:url,
            
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export function login(userName, passWord) {
    return function (dispatch, getState) {
        let isDevMode = false;
        let axiosParams = {
            method: "POST",
            url: "/CLogin/login",
            data: {
                Username: userName,
                Password: passWord
            }
        };
        NetworkActions.makeHTTPRequest(axiosParams, isDevMode)
            .then(function (response) {
                let data = response.data;
                let userRole = data.role;
                let userID=data.U_id;
                getCustomerProfile(userID,userRole).then(function (response) {
                    let customer = response.data;
                    dispatch({
                        type: types.LOGIN_SUCCESS, payload: {
                            userRole: userRole,
                            customer : customer
                        }
                    }); 
                })
            }).catch(function (error) {
                dispatch({ type: types.LOGIN_FAIL });
                DropDownHolder.getDropDown().alertWithType('error', 'error', "Something try again please try again");

            });
    }

}
