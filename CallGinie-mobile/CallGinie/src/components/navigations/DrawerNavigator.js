import React from "react";
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import Profile from "../screens/profile/Profile";
import Drawer from "./Drawer";

const DrawerNavigator = createDrawerNavigator(
    {
        Profile:{
            screen:Profile,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        }
    } ,
    {
        initialRouteName: 'Profile',
        contentComponent: (props) => (

            <Drawer {...props} />
        ),
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false,
            drawerLockMode: 'locked-closed',
        },
    }
);

export default DrawerNavigator;