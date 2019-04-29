import React, { Component } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import { styles } from "./Styles";
const app_logo = require('../../../assets/Ginie_logo.png');

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";

class Splash extends Component {

    componentDidMount(){
        this.props.fetchLoggedInCustomer();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAlreadyLoggedIn != nextProps.isAlreadyLoggedIn) {
            if (nextProps.isLoggedIn == "true") {
                this.props.navigation.navigate("DrawerNavigator");
            }
            else{
                this.props.navigation.navigate("Login");
            }


        }
    }
    render() {
        return (
            <View style={styles.background}>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Image source={app_logo} style={styles.logo} />
                    <Text style={styles.logoText}>Call Genie</Text>
                </View>
            </View>
        );
    }



}

const mapStateToProps = (state) => {
    return {
        isAlreadyLoggedIn: state.AuthReducer.isAlreadyLoggedIn,
        isLoggedIn: state.AuthReducer.isLoggedIn
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);