import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Text
} from 'react-native';
import { styles } from "./Styles";
const app_logo = require('../../../assets/Ginie_logo.png');
const customerImage = require('../../../assets/Customer.png');
const mechanicImage = require('../../../assets/Mechanic.png');


export default class Login extends Component {
    
    constructor(props){
        super(props);
        this.redirectToRegister=this.redirectToRegister.bind(this);
      
        
    }
    redirectToRegister(userType){
        this.props.navigation.navigate( "Registration",{
           userType:userType
        });
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Image source={app_logo} style={styles.logo} />
                    <Text style={styles.logoText}>Call Genie</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
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
                    <TouchableOpacity
                        style={styles.loginButton}
                        
                    >
                        <Text style={styles.loginTextStyle} >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.registerButtonsContainer}>
                    <TouchableOpacity onPress={()=>{this.redirectToRegister("customer")}}>
                        <View style={styles.registeredButton}>
                            <Image source={customerImage} style={styles.registerImage} />
                            <Text style={styles.registerText}>Register</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.redirectToRegister("mechanic")}}>
                        <View style={styles.registeredButton}>
                            <Image resizeMode={"contain"} source={mechanicImage} style={styles.registerImage} />
                            <Text style={styles.registerText}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
             </View>
        );
    }
}