import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    TextInput,
    ActivityIndicator,
    Text
} from 'react-native';
import { styles } from "./Styles";
const app_logo = require('../../../assets/Ginie_logo.png');
const customerImage = require('../../../assets/Customer.png');
const mechanicImage = require('../../../assets/Mechanic.png');

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.redirectToRegister = this.redirectToRegister.bind(this);
        this.state = {
            userName: "Atif",
            password: "Atif",
            isLoading: false
        }
        this.login = this.login.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isLoggedIn != nextProps.isLoggedIn) {
            if(nextProps.isLoggedIn=="true"){
                this.props.navigation.navigate("DrawerNavigator");
            }
            else{
                this.setState({
                    isLoading: false
                })
            }
           
        }
    }
    redirectToRegister(userType) {
        this.props.navigation.navigate("Registration", {
            userType: userType
        });
    }
    login() {
        this.setState({
            isLoading: true
        })
        this.props.login(this.state.userName, this.state.password);
    };


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
                        value={this.state.userName}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.textInput}
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        placeholderTextColor={"#ffffff"}
                        label="Email"
                        value={this.state.password}
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize={"none"}
                        textContentType={"password"}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.login}
                        disabled={this.state.isLoading}
                    >
                        {this.state.isLoading ? (<ActivityIndicator size={"small"} color={"white"} />) : (<Text style={styles.loginTextStyle} >
                            Login
                        </Text>)}
                    </TouchableOpacity>
                </View>

                <View style={styles.registerButtonsContainer}>
                    <TouchableOpacity onPress={() => { this.redirectToRegister("customer") }}>
                        <View style={styles.registeredButton}>
                            <Image source={customerImage} style={styles.registerImage} />
                            <Text style={styles.registerText}>Register</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.redirectToRegister("mechanic") }}>
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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.AuthReducer.isLoggedIn,
        userType: state.AuthReducer.userType
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);