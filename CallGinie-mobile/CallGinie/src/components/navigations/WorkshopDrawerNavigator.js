import React from "react";
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import BookARide from "../screens/bookARide/BookARide";
import Profile from "../screens/Profile/Profile"
import Drawer from "./Drawer";
import CarServices from "../screens/carServicesSettings/CarServices";
import CustomerAppointmentList from "../screens/Customer/AppointmentList/AppointmentList";
import BookService from "../screens/bookARide/BookService";

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
const BookServiceStackNavigator=createStackNavigator(
    {
        BookService:{
            screen:BookService,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        },
    }
);

const WorkshopDrawerNavigator = createDrawerNavigator(
    {
       
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
        },
        BookService:{
            screen:BookService,
            navigationOptions:{
                gesturesEnabled: false,
                swipeEnabled: false,
                animationEnabled: false 
            }
        }

    },
    {
        initialRouteName: 'BookService',
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

export default WorkshopDrawerNavigator;