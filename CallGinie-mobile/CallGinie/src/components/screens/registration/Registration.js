import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Text,
    ActivityIndicator
} from 'react-native';
import { styles } from "./Styles";
import { PageTemplate } from "../../common";
import { width, height } from "react-native-dimension";
import { DropDownHolder } from '../../common/DropDownHolder';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const placeholder = require('../../../assets/placeholder.png');


class Registration extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        const { params } = this.props.navigation.state;
        const userType = params ? params.userType : "customer";
        this.state = {
            userType: userType,
            fullName: "",
            password: "",
            email: "",
            phone: "",
            cnic: "",
            workshopName: "",
            isSigningUp:false
        };
        this.signUp = this.signUp.bind(this);
        this.signUpCustomer = this.signUpCustomer.bind(this);
        this.signUpMechanic = this.signUpMechanic.bind(this);
    }
    goBack() {
        this.props.navigation.goBack();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.isRegisterSuccessfully!=nextProps.isRegisterSuccessfully){
            this.setState({
                isSigningUp:false
            });
        }
    }
    signUpCustomer() {
        let fullName = "";
         let isValidatingPhone=this.validatePhoneNumber(this.state.phone.length);
        if (this.state.fullName.length == 0 || this.state.password.length == 0
            || this.state.email.length == 0 || this.state.phone.length == 0 || !isValidatingPhone) {
            DropDownHolder.getDropDown().alertWithType('error', 'Error', "Please fill all the fields ");

        }
        else {
            let customer = {
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                phone: this.state.phone,
            };
            this.setState({
                isSigningUp:true
            });
            this.props.registerCustomer(customer)
        }
    }
    signUpMechanic() {
        let fullName = "";
        let isValidatingPhone = this.validatePhoneNumber(this.state.phone);
        let isValidatingCNIC =true;// this.validateCNIC(this.state.cnic);
        let validateEmail = this.validateEmail(this.state.email);
        if (this.state.fullName.length == 0 || this.state.password.length == 0
            || this.state.email.length == 0 || this.state.phone.length == 0
            || this.state.cnic.length == 0 || this.state.workshopName.length == 0) {
            DropDownHolder.getDropDown().alertWithType('error', 'Error', "Please fill all the fields ");

        }
        else if(!isValidatingPhone){
            DropDownHolder.getDropDown().alertWithType('error', 'Error', "Phone number is invalid");
        }
        else if(!isValidatingCNIC){
            DropDownHolder.getDropDown().alertWithType('error', 'Error', "CNIC is invalid");
        }
        else if(!validateEmail){
            DropDownHolder.getDropDown().alertWithType('error', 'Error', "Email is invalid");

        }
        else {
            let workshop = {
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                cnic: this.state.cnic,
                phone: this.state.phone,
                workshopName: this.state.workshopName
            };
            // this.setState({
            //     isSigningUp:true
            // });
            this.props.navigation.navigate("PinLocation"
            ,{workshop:workshop}
        );
            //this.props.registerWorkshop(workshop)
        }
    }
    signUp() {
        if (this.state.userType == "customer") {
            return this.signUpCustomer();
        }
        else {
            
            return this.signUpMechanic();
        }



    }

     validatePhoneNumber(inputTxt)
    {
        var phoneNo = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        if(phoneNo.test(inputTxt))
            {
            return true;
            }
        else
           {
            return false;
            }
    }
    validateCNIC(inputTxt){
        var cnic=/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
        if(cnic.test(inputTxt))
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    validateEmail(inputText){
        var email=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(email.test(inputText))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    render() {
        return (
            <PageTemplate
                title={this.state.userType == "mechanic"?"Register Workshop": "Register Customer"}
                iconName={"chevron-left"}
                onLeftButtonPress={this.goBack}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.fullNameContainer}>
                        <TouchableOpacity>
                            <Image source={placeholder} style={styles.placeholderImage} />
                        </TouchableOpacity>
                        <View style={styles.nameContainer}>
                            <Text style={styles.textInputLabel}>{"Full Name"}</Text>
                            <TextInput
                                style={[styles.textInput, { minWidth: width(65) }]}
                                autoCorrect={false}
                                autoCapitalize={"none"}
                                placeholderTextColor={"#8492A6"}
                                label="Name"
                                onChangeText={(text) => { this.setState({ fullName: text }) }}
                                value={this.state.fullName}
                                placeholder="Full Name"
                            />
                        </View>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.textInputLabel}>{"EMail"}</Text>
                        <TextInput
                            style={styles.textInput}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            placeholderTextColor={"#8492A6"}
                            label="Email"
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            value={this.state.email}
                            placeholder="******@****.com"
                        />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.textInputLabel}>{"Phone"}</Text>
                        <TextInput
                            style={styles.textInput}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            placeholderTextColor={"#8492A6"}
                            label="Phone"
                            onChangeText={(text) => { this.setState({ phone: text }) }}
                            value={this.state.phone}
                            textContentType={"telephoneNumber"}
                            placeholder="+92 *** *******"
                        />
                    </View>
                    {this.state.userType == "mechanic" ?
                        (
                            <View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.textInputLabel}>{"CNIC"}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        autoCorrect={false}
                                        autoCapitalize={"none"}
                                        placeholderTextColor={"#8492A6"}
                                        label="Email"
                                        onChangeText={(text) => { this.setState({ cnic: text }) }}
                                        value={this.state.cnic}
                                        textContentType={"creditCardNumber"}
                                        placeholder={"***** ******* *"}

                                    />
                                </View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.textInputLabel}>{"Workshop Name"}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        autoCorrect={false}
                                        autoCapitalize={"none"}
                                        placeholderTextColor={"#8492A6"}
                                        label="Email"
                                        onChangeText={(text) => { this.setState({ workshopName: text }) }}
                                        value={this.state.workshopName}
                                        placeholder={"workshop name"}
                                    />
                                </View>
                            </View>
                        ) : null}
                    <View style={styles.nameContainer}>
                        <Text style={styles.textInputLabel}>{"Password"}</Text>
                        <TextInput
                            style={styles.textInput}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            placeholderTextColor={"#8492A6"}
                            label="Email"
                            textContentType={"password"}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            value={this.state.password}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={this.signUp}
                    >
                        {this.state.isSigningUp
                        ?(<ActivityIndicator style={styles.signUpStyle} color={"#FFFFFF"} size={"small"}/>):(<Text style={styles.signUpStyle}>Sign Up</Text>)}
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </PageTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        isRegisterSuccessfully:state.RegisterReducer.isRegisterSuccessfully,
        error:state.RegisterReducer.error
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);