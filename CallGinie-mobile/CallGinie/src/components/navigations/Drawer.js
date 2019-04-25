
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
        this.goToProfile=this.goToProfile.bind(this); 
        this.goToBookService=this.goToBookService.bind(this);
        this.goToCarServices=this.goToCarServices.bind(this);
        this.goToCustomerAppointmentList=this.goToCustomerAppointmentList.bind(this);
    }
    goToProfile(){
        let route='Profile';
        let focused='true';
     
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    goToBookService(){
        let route='BookARide';
        let focused='true';
     
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    goToCustomerAppointmentList(){
        let route='CustomerAppointmentList';
        let focused='true';
     
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    goToCarServices(){
        let route='CarServices';
        let focused='true';
     
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
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

           {this.props.userType=='carowner'?
            <TouchableOpacity style={styles.drawerItemContainer} onPress={this.goToBookService}>
                <Text style={styles.drawerItemText}>{"Book Service"}</Text>
            </TouchableOpacity>:null}
            <TouchableOpacity style={styles.drawerItemContainer} onPress={this.goToProfile}>
                <Text style={styles.drawerItemText}>{"Profile"}</Text>
            </TouchableOpacity>
            {this.props.userType=='carowner'?
            <TouchableOpacity style={styles.drawerItemContainer}>
                <Text style={styles.drawerItemText}>{"Book in Advance"}</Text>
            </TouchableOpacity>:null}
            {this.props.userType=='workshopowner'?
                <TouchableOpacity style={styles.drawerItemContainer}>
                    <Text style={styles.drawerItemText}>{"Your Earnings"}</Text>
                </TouchableOpacity>:null}
            <TouchableOpacity style={styles.drawerItemContainer} onPress={this.goToCustomerAppointmentList}>
                <Text style={styles.drawerItemText}>{"Appointments"}</Text>
            </TouchableOpacity>
            {this.props.userType=='workshopowner'?
                <TouchableOpacity style={styles.drawerItemContainer} onPress={this.goToCarServices}>
                    <Text style={styles.drawerItemText}>{"Car Services"}</Text>
                </TouchableOpacity>:null}
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
       customer:state.AuthReducer.customer,
       userType:state.AuthReducer.userType
    }
};
function mapDispatchToProps(dispatch) {

    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);