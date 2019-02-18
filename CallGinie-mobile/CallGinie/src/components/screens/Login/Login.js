import React, { Component } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    View,
    Image,
    TextInput,
    Text
} from 'react-native';
import {styles} from "./Styles";
const app_logo = require('../../../assets/Ginie_logo.png');



export default class LoginForm extends Component {

    render(){
        return(
            <View style={styles.background}>
              <View style={{ flexDirection:'column',justifyContent:'center'}}>
                   <Image source={app_logo} style={styles.logo}/>
                   <Text style={styles.logoText}>Call Genie</Text>
                </View>
                <View style={{ flexDirection:'column',justifyContent:'center'}}>
                        <TextInput
                            style={styles.textInput}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            placeholderTextColor={"#ffffff"}
                            label="Email"
                            placeholder="Email"
                        />
                      <TextInput
                            style={styles.textInput}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            placeholderTextColor={"#ffffff"}
                            label="Email"
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize={"none"}
                            textContentType={"password"}
                        />
                </View>
            </View>
        );
    }
}