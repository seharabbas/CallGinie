import axios from 'axios';
import {NetInfo} from "react-native";

export  function makeHTTPRequest(request,isDevMode,dummyData){
  return new Promise(function(resolve,reject) 
  { 
    if(isDevMode)
    {
        resolve(dummyData);
    }
    else {
      NetInfo.getConnectionInfo().then((ConnectionInfo) => {
        if (ConnectionInfo.type != "none") {
          axios(
            {
              ...request
              , timeout: 18000
            }
          ).then(function (response) {
            console.log(response);
            resolve(response);
          }).catch(function (error) {
            console.log(error);
            reject(error);
          });
        }
        else{
          reject(error);
        }
      }).catch(function(error){
        reject(error);
      });
    }
  });
}


export function makeHTTPFetchRequest(url,requestObj){
  return new Promise(function(resolve,reject)
  {
    fetch(url,requestObj)
      .then((response) =>{
        return response; 
      })  
    .then((responseJson) => {
         resolve(responseJson);
      })
      .catch((error) =>{
          reject(error);
      });
    });
}

function getDummyErrorMessage () {
  return error = {
      message: "DEV_ERROR"
  }
}