
import React, { Component } from "react";
import { DrawerActions } from 'react-navigation';
import { StackActions, NavigationActions } from "react-navigation";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    Alert,
    Image
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";

import styles from "./Styles";


class Drawer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={styles.container}>
            <TouchableOpacity>
                <Image source={placeholder} style={styles.placeholderImage} />
            </TouchableOpacity>
        </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        // clientName:state.loginAuthorization.name,
        // clientID:state.loginAuthorization.clientID,
        // clientList:state.loginAuthorization.clientList,
        // switchAccountsError:state.loginAuthorization.switchAccountsError
    }
};
function mapDispatchToProps(dispatch) {

    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);