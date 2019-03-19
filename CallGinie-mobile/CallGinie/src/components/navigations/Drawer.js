
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
import * as ReduxActions from "../../actions";
import StarRating from "react-native-star-rating";
import styles from "./Styles";

const placeholder = require('../../assets/placeholder.png');

class Drawer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={styles.container}>
                <Image source={placeholder} style={styles.placeholderImage} />
            <Text style={styles.customerName}> {this.props.customer.FullName}</Text>
            <StarRating
            disabled={true}
            containerStyle={styles.ratings}
            maxStars={5}
            rating={3}
            starSize={30}
            emptyStarColor={"white"}
            fullStarColor={"#fcaf17"}
            halfStarColor={"#fcaf17"}
            />
            <TouchableOpacity style={styles.drawerItemContainer}>
                <Text style={styles.drawerItemText}>{"Profile"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItemContainer}>
                <Text style={styles.drawerItemText}>{"Book in Advance"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItemContainer}>
                <Text style={styles.drawerItemText}>{"Appointments"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItemContainer}>
                <Text style={styles.drawerItemText}>{"Deactivate Accounts"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItemContainer}>
                <Text style={styles.drawerItemText}>{"Change Password"}</Text>
            </TouchableOpacity>
        </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
       customer:state.AuthReducer.customer
    }
};
function mapDispatchToProps(dispatch) {

    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);