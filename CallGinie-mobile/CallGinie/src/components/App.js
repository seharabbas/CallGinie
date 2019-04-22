import SplashNavigator from './navigations/navigator';
import React, { Component } from 'react';
import { View } from "react-native"
import { createAppContainer } from 'react-navigation';
import { URL_BASEURL } from '../App_Config';
import axios from 'axios';
import DropdownAlert from 'react-native-dropdownalert';
import { DropDownHolder } from "../components/common/DropDownHolder";
import store from "../store";
import { Provider } from 'react-redux';


const AppContainer = createAppContainer(SplashNavigator);

export default class App extends Component {

    constructor(properties) {
        super(properties);
        
    }
    componentDidMount() {
        axios.defaults.baseURL = URL_BASEURL;
        axios.defaults.headers.common = {
            'Accept': 'Application/json',
            "content-type": "application/json",
            'is-Mobile': true,
        };
    }
    render() {
        return (
            <Provider store={store} >
                <View style={{ flex: 1 }}>
                    <AppContainer

                        uriPrefix="/app"
                    />
                    <DropdownAlert
                        ref={(ref) => DropDownHolder.setDropDown(ref)}
                        tapToCloseEnabled
                        useNativeDriver={true}
                        updateStatusBar={false}
                    //   showCancel
                    //   cancelBtnImageStyle={{ padding: 8, width: 24, height: 24, alignSelf: 'center' }}
                    />
                </View>
            </Provider>
        );
    }
}
