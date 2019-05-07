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
import OneSignal from 'react-native-onesignal';
import { ThemeConsumer } from 'react-native-elements';

class Splash extends Component {
        constructor(props){
            super(props);
            this.onOpened = this.onOpened.bind(this);
            this.onReceived=this.onReceived.bind(this);
            this.onIds=this.onIds.bind(this);
            this.state={
                notificationIDs:[]
            };
            OneSignal.init("1f506cb2-b534-4b14-a8f5-bb5aff3ec1fc", {
                kOSSettingsKeyAutoPrompt: true,
            });
            OneSignal.getPermissionSubscriptionState((status) => {
                userID = status.userId;
    
            });
            OneSignal.inFocusDisplaying(2);
            OneSignal.configure();
            OneSignal.addEventListener('ids', this.onIds);
            OneSignal.addEventListener('received', this.onReceived);
            OneSignal.addEventListener('opened', this.onOpened);
            this.notificationMessageManager=this.notificationMessageManager.bind(this);

        }

        onIds(device) {
            if (device && device.userId) {
                //  this.props.setPushNotificationUserId(device.userId)
                
            }
        }
    componentDidMount(){
        this.props.fetchLoggedInCustomer();
    
    }
    notificationMessageManager(notificationData){
        try{
            let notificationID=notificationData.payload.notificationID;
            let notificationIDs=[...this.state.notificationIDs];
            let payload=notificationData.payload.additionalData;
            notificationIDs.push(notificationID);
            if(this.props.isLoggedIn == "true"){
               switch(payload.ScreenName){
                   case "BookARide":
                        this.props.setWorkshopDetailsForAppointment(payload);
                        break;
                   case "TrackLocation":
                        this.props.updateWorkshopLocation(payload);
                        break;
                   case "MechanicReached":
                        this.props.onMechanicReached();
                        break;
                   case "end_appointment":
                        this.props.endService(payload.appointmentID);
                        break;
                   default:
                        break;
               }
                
            }
            this.setState({
                notificationIDs:notificationIDs
            });

        }catch(e){

        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isAlreadyLoggedIn != nextProps.isAlreadyLoggedIn) {
            if (nextProps.isLoggedIn == "true") {
                if(nextProps.userType=="workshopowner"){
                    this.props.navigation.navigate("WorkshopDrawerNavigator");
                }else{
                    this.props.navigation.navigate("DrawerNavigator");
                }
              
            }
            else{
                this.props.navigation.navigate("Login");
            }
        }
    }
    onReceived(notification){
        let notificationID=notification.payload.notificationID;
        if(this.state.notificationIDs.indexOf(notificationID)==-1 && notification.isAppInFocus){
            this.notificationMessageManager(notification);
        }
        
    }
    onOpened(notification){
        let notificationID=notification.notification.payload.notificationID;
        if(this.state.notificationIDs.indexOf(notificationID)==-1){
            this.notificationMessageManager(notification);
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
    componentWillUnmount(){
        OneSignal.removeEventListener('ids', this.onIds);
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
    }


}

const mapStateToProps = (state) => {
    return {
        isAlreadyLoggedIn: state.AuthReducer.isAlreadyLoggedIn,
        isLoggedIn: state.AuthReducer.isLoggedIn,
        userType: state.AuthReducer.userType
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);