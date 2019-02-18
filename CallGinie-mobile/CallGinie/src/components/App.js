import SplashNavigator from './screens/Login/Login';
import React, { Component } from 'react';
import {View} from "react-native"

export default class App extends Component {

    constructor(properties){
        super(properties);
       
    }
    render() {
        return (
            <View style={{flex:1}} >
                    <SplashNavigator />
            </View>
          
        );
    }
}
