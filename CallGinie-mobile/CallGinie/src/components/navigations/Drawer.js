
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
    Alert,
    Image
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../actions";
import StarRating from "react-native-star-rating";
import styles from "./Styles";
import AsyncStorage from '@react-native-community/async-storage';

const placeholder = require('../../assets/placeholder.png');

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.goToProfile=this.goToProfile.bind(this); 
        this.goToBookService=this.goToBookService.bind(this);
        this.goToCarServices=this.goToCarServices.bind(this);
        this.goToCustomerAppointmentList=this.goToCustomerAppointmentList.bind(this);
        this.logoutUser=this.logoutUser.bind(this);
        this.goToBookInAdvance=this.goToBookInAdvance.bind(this);
        this.logout=this.logout.bind(this);
        this.logoutConfirm=this.logoutConfirm.bind(this);
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
            routeName: route,
            key: 'bookARide'
        });
        this.props.navigation.dispatch(navigateAction);
    }
    goToBookInAdvance(){
        let route='ScheduleARide';
        let focused='true';
     
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            key: 'BookInAdvance',
            params: { fromScheduledTab: true }
        });
        this.props.navigation.dispatch(navigateAction);
    }
    goToCustomerAppointmentList(){
        let route='CustomerAppointmentList';
        let focused='true';
     
        const navigateAction = NavigationActions.navigate({
            routeName: route,
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
    logout(){
       
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: "Splash" })]
          },
            {
              index: 1,
              key: null,
              actions: [NavigationActions.navigate({ routeName: "Login" })]
            }
          );
          this.props.navigation.dispatch(resetAction);
          this.props.logout();
    }
    logoutConfirm() {
        AsyncStorage.clear().then(() => {
          this.logout();
        });
      }
    logoutUser(){
       Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                { text: 'Cancel', onPress: () => { return null } },
                {
                  text: 'Confirm', onPress: this.logoutConfirm
                },
              ],
              { cancelable: false }
            )
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
            <TouchableOpacity style={styles.drawerItemContainer} onPress={this.goToBookInAdvance}>
                <Text style={styles.drawerItemText}>{"Book in Advance"}</Text>
            </TouchableOpacity>:null}
            {this.props.userType=='workshopowner'?
                <TouchableOpacity style={styles.drawerItemContainer}  onPress={this.goToCustomerAppointmentList}>
                    <Text style={styles.drawerItemText}>{"Your Earnings"}</Text>
                </TouchableOpacity>:null}
            <TouchableOpacity style={styles.drawerItemContainer} onPress={this.goToCustomerAppointmentList}>
                <Text style={styles.drawerItemText}>{"Appointments"}</Text>
            </TouchableOpacity>
            {this.props.userType=='workshopowner'?
                <TouchableOpacity style={styles.drawerItemContainer} onPress={this.goToCarServices}>
                    <Text style={styles.drawerItemText}>{"Car Services"}</Text>
                </TouchableOpacity>:null}
            <TouchableOpacity style={styles.drawerItemContainer} onPress={this.logoutUser}>
                <Text style={styles.drawerItemText}>{"Logout"}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.drawerItemContainer}>
                <Text style={styles.drawerItemText}>{"Change Password"}</Text>
            </TouchableOpacity> */}
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