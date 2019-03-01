import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login/Login';
import Registration from "../screens/registration/Registration";


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
        Registration:{
            screen: Registration,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
       
    }
    
);

export default SplashNavigator;
