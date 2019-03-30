
import * as NetworkActions from "./NetworkActions";
import * as types from "./types"
import { DropDownHolder } from '../components/common/DropDownHolder';


const Services=[
    {label:"I dont know what's wrong",value:-1},
    {label:"Tyre Puncture",value:2},
    {label:"Oil Change",value:3},
    {label:"CV Axle / Shaft Assembly Replacement",value:4},
    {label:"Axle Shaft Seal Replacement",value:5},
    {label:"Center Support Bearing Replacement",value:6},
    {label:"Clutch Cable Replacement",value:7}
    ,{label:"ABS Light is on Inspection",value:8}
    ,{label:"Clear fluid is leaking Inspection",value:9}

]

export function getServices() {
    return function (dispatch, getState) {
        dispatch({
             type: types.GET_SERVICE_LIST,
             payload:{services:Services}
        });
    }
}