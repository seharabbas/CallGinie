import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login/Login';
import Splash from "../screens/splash/Splash";
import Registration from "../screens/registration/Registration";
import PinLocation from "../screens/pinLocation/PinLocation";
import DrawerNavigator from "./DrawerNavigator";
import CustomerAppointmentDetails from "../screens/Customer/AppointmentDetails/AppointmentDetails";
export const SplashNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        Splash: {
            screen: Splash,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        Registration:{
            screen: Registration,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        PinLocation:{
            screen: PinLocation,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        DrawerNavigator:{
            screen:DrawerNavigator,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        CustomerAppointmentDetails:{
            screen:CustomerAppointmentDetails,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        }

    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none',
       
    }
    
);

export default SplashNavigator;
