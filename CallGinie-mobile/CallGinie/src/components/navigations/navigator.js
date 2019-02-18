import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
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
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
       
    }
    
);

export default SplashNavigator;
