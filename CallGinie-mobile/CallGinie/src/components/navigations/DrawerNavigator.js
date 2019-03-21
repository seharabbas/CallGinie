import React from "react";
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import BookARide from "../screens/bookARide/BookARide";
import Drawer from "./Drawer";

const DrawerNavigator = createDrawerNavigator(
    {
        BookARide:{
            screen:BookARide,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        }
    } ,
    {
        initialRouteName: 'BookARide',
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