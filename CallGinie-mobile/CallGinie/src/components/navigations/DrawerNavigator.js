import React from "react";
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import BookARide from "../screens/bookARide/BookARide";
import Profile from "../screens/Profile/Profile"
import Drawer from "./Drawer";
import CarServices from "../screens/carServicesSettings/CarServices";
import CustomerAppointmentList from "../screens/Customer/AppointmentList/AppointmentList";


const CarServicesStackNavigator=createStackNavigator(
   { 
    CarServices:{
        screen:CarServices,
        navigationOptions:{
            gesturesEnabled: false,
            swipeEnabled: false,
            animationEnabled: false 
        }
    },
   }
);






const DrawerNavigator = createDrawerNavigator(
    {
        BookARide:{
            screen:BookARide,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        Profile:{
            screen:Profile,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        CarServices:{
            screen:CarServices,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
        CustomerAppointmentList:{
            screen:CustomerAppointmentList,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        }

    } ,
    {
        initialRouteName:  'BookARide',
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