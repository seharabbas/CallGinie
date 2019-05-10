import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Platform,
    ActivityIndicator,
    Text
} from 'react-native';
import { PageTemplate, BottomModalFlatListDropDown, GooglePlacesSearch } from "../../common";
import { width, height } from "react-native-dimension";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../config';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from "../../../App_Config";
import styles from "./Styles";
const ASPECT_RATIO = width(100) / height(100);
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import WorkshopFooter from "./WorkshopFooter";
import ReceiptViewer from "./ReceiptViewer";
import Permissions from 'react-native-permissions';
import DateTimePicker from "react-native-modal-datetime-picker";

import { DropDownHolder } from '../../common/DropDownHolder';//'../../common/DropDownHolder';
import moment from 'moment';


class BookARide extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        const { params } = this.props.navigation.state;
        this.fromScheduledTab = params ? params.fromScheduledTab : false;
        let permissionGranted = false;
        if (Platform.OS == "ios") {
            permissionGranted = true;
        }
        else {

        }
        this.state = {
            isServicesVisible: false,
            isDateTimePickerVisible: false,
            selectedServices: [],
            permissionGranted: permissionGranted,
            fromScheduledTab: this.fromScheduledTab,
            origin: null,
            date:null,
            workshop: null,
            workshopLocation: null,
            isFetchingData: 'false',
            cancelService: true,
            isServiceEnded: false,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
        this.timeout = null;
        this.setTimerForServices = this.setTimerForServices.bind(this);
        this.setLocationDetail = this.setLocationDetail.bind(this)
        this.onServiceSelect = this.onServiceSelect.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.bookService = this.bookService.bind(this);
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
        this.requestLocationPermission = this.requestLocationPermission.bind(this);
        this.onCancelDialog = this.onCancelDialog.bind(this);
    }

    requestLocationPermission() {
        Permissions.request('location').then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ photoPermission: response })
            if (response === 'authorized') {
                this.setState({
                    permissionGranted: true
                });
                this.getCurrentPosition();
            } else {
                this.setState({
                    permissionGranted: false
                });
            }
        });
    }


    bookService() {
        if(this.state.fromScheduledTab){
            this.setState({
                isFetchingData: 'isSaving'
            });
        }
        else{
            this.setState({
                isFetchingData: 'true'
            });
        }
        
        let serviceIds = [];
        let i = 0;
        for (; i < this.state.selectedServices.length; i++) {
            let id = parseInt(this.state.selectedServices[i].value);
            serviceIds.push(id);
        }
        let bookServiceObj = {};
        let location = {};
        let latitude = this.state.origin == null ? this.state.region.latitude : this.state.origin.latitude;
        let longitude = this.state.origin == null ? this.state.region.longitude : this.state.origin.longitude;
        location.longitude = longitude;
        let date=moment(this.state.date).format('DD/MM/YYYY');
        let time=moment(this.state.date).format('hh:mm a');
        location.latitude = latitude;
     
        bookServiceObj.location = location;
        bookServiceObj.serviceIds = serviceIds;
        bookServiceObj.carOwnerId = this.props.customer.CO_Id;
        if(this.state.fromScheduledTab){
            bookServiceObj.date=date;
            bookServiceObj.time=time;
            this.props.bookAServiceInAdvance(bookServiceObj);
        }
        else{
            this.props.bookAService(bookServiceObj);
        }
     

    }


    componentDidMount() {
        // if (this.props.userType == "workshopowner") {
        //     this.props.navigation.navigate("BookService");
        //     return;
        // }
        this.props.getCarServices();
        if (Platform.OS == "android") {
            this.requestLocationPermission();
        }
        else {
            this.getCurrentPosition();
        }

    }

    getCurrentPosition() {

        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    origin: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => console.log(error.message),
            {
                enableHighAccuracy: false, timeout: 1000
            },
        );

    }
    goBack() {
        this.props.navigation.goBack();
    }
    onServiceSelect() {
        this.setState({
            isServicesVisible: true
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.isBookServiceInAdvance!=nextProps.isBookServiceInAdvance){
            this.setState({
                isServicesVisible: false,
                selectedServices: [],
                permissionGranted: this.state.permissionGranted,
                origin: null,
                date:null,
                workshop: null,
                workshopLocation: null,
                isFetchingData: 'false',
                cancelService: true,
                isServiceEnded: false,
                region: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }
            })
        }
        if (this.props.isServiceBooked != nextProps.isServiceBooked && nextProps.isServiceBooked == false) {
            this.setState({
                isServicesVisible: false,
                selectedServices: [],
                permissionGranted: this.state.permissionGranted,
                origin: null,
                workshop: null,
                workshopLocation: null,
                isFetchingData: 'false',
                cancelService: true,
                isServiceEnded: false,
                region: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }
            });
            return;
        }
        if (this.props.error != nextProps.error) {
            this.setState({
                isFetchingData: "false"
            });
        }
        else if (this.props.isServiceBooked != nextProps.isServiceBooked) {
            this.setTimerForServices();
        }
        if (this.props.workshop != nextProps.workshop) {
            this.setState({
                workshop: nextProps.workshop,
                workshopLocation: nextProps.workshopLocation,
                isFetchingData: "showWorkshop"
            });
            if (this.timeout != null) {
                clearTimeout(this.timeout);
            }
        }
        if (this.props.workshopLocation != nextProps.workshopLocation) {
            this.setState({
                workshopLocation: nextProps.workshopLocation
            });
        }
        if (this.props.hasMechanicReached != nextProps.hasMechanicReached) {
            DropDownHolder.getDropDown().alertWithType('success', 'success', "Your mechanic has reached your location");
            this.setState({
                cancelService: false,
                workshopLocation: { ...this.state.origin }
            });
        }
        if (this.props.appointment != nextProps.appointment) {
            this.setState({
                isServiceEnded: true
            })
        }

    }
    setTimerForServices() {
        this.timeout = setTimeout(() => {
            this.setState({
                isFetchingData: "false"
            });
            DropDownHolder.getDropDown().alertWithType('error', 'error', "Failed to find you any workshops.");
        }, 300000);
    }
    onSelected(selectedList) {
        this.setState({
            selectedServices: [...selectedList],
            isServicesVisible: false
        })
    }
    onCancel() {
        this.setState({
            isServicesVisible: false
        });
    }
    onCancelDialog() {
        this.setState({
            isServiceEnded: false
        });
    }
    setLocationDetail(origin, region) {
        this.setState({
            origin: origin,
            region: region
        });
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
    
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
    
      handleDatePicked = date => {
        let  formattedDate= moment(date).format("DD/MM/YYYY HH:MM a");
        this.setState({
            date:formattedDate
        });
        this.hideDateTimePicker();
      };
    render() {
        if (this.state.permissionGranted) {
            return (
                <PageTemplate
                    title={this.state.fromScheduledTab?"Schedule Appointment":"Book Service"}
                    navigation={this.props.navigation}
                >

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.container}
                        showsMyLocationButton={true}
                        zoomEnabled={true}
                        scrollEnabled={true}
                        loadingEnabled={true}
                        loadingIndicatorColor="#666666"
                        loadingBackgroundColor="#eeeeee"
                        moveOnMarkerPress={false}
                        showsUserLocation={true}
                        showsScale={true}
                        showsUserLocation={true}
                        animateToRegion
                        region={this.state.region}
                    >
                        {this.state.origin != null ? (<MapView.Marker
                            coordinate={this.state.origin}
                            key={0}
                        >
                            <Icon
                                size={40}
                                style={{ Top: 50 }}
                                color={colors.purple}
                                name={"car"} />
                        </MapView.Marker>
                        ) : null}
                        {this.state.workshopLocation != null ?
                            (<MapView.Marker
                                coordinate={this.state.workshopLocation}
                                key={1}
                            >
                                <Icon
                                    size={40}
                                    style={{ Top: 50 }}
                                    color={colors.chili_red}
                                    name={"screwdriver"} />
                            </MapView.Marker>
                            ) : null}
                        {this.state.workshop != null ?
                            (<MapViewDirections
                                origin={this.state.origin}
                                destination={this.state.workshopLocation}
                                apikey={GOOGLE_API_KEY}
                                strokeWidth={5}
                                strokeColor="green"
                                optimizeWaypoints={true}
                            />) : null}
                    </MapView>
                    {this.state.isFetchingData == 'false' ?
                        (<TouchableOpacity style={styles.serviceContainer} onPress={() => { this.onServiceSelect() }}>
                            <Text style={styles.serviceText}>{"Tell me what's wrong"}</Text>
                            {this.state.selectedServices.length > 0 ? (<View style={{ marginRight: 5 }}>
                                <Icon
                                    size={30}
                                    color={colors.dark_grey_1}
                                    name={"delete-variant"} />
                                <View style={styles.itemContainer}>
                                    <Text style={{ color: colors.white, fontSize: 14 }}>{this.state.selectedServices.length}</Text>
                                </View>
                            </View>) : null}
                        </TouchableOpacity>) : null}
                    <View style={[styles.servicesContainer, { paddingTop: 20, flex: 1 }]}>
                        <GooglePlacesSearch
                            setLocationResult={this.setLocationDetail}
                        />
                    </View>
                    {this.state.selectedServices.length > 0 && this.state.isFetchingData == 'false' && (this.state.fromScheduledTab?this.state.date!=null:true) ? (<TouchableOpacity style={styles.bookService} onPress={this.bookService}>
                        <Text style={styles.bookServiceText}>{"Book Service"}</Text>
                    </TouchableOpacity>) : null}
                    {this.state.isFetchingData == "isSaving"? (<TouchableOpacity style={styles.bookService} onPress={this.bookService}>
                        <Text style={styles.bookServiceText}>{"Book Service"}</Text>
                            <ActivityIndicator size={"small"} color={"white"}/>
                    </TouchableOpacity>) : null}
                    {this.state.fromScheduledTab ? (
                        <View>
                            <TouchableOpacity style={[styles.bookService, { bottom: height(20) }]} onPress={this.showDateTimePicker}>
                                <Text style={styles.bookServiceText}>{this.state.date==null?"Choose Date / Time":this.state.date}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                mode={"datetime"}
                                onCancel={this.hideDateTimePicker}
                            />
                        </View>
                    ) : null}

                    {this.state.isFetchingData == 'true' ? (
                        <View style={styles.isFetchingData}>
                            <Text style={styles.isFetchingDataText}>{"Searching Nearby Workshops ....."}</Text>
                        </View>
                    ) : null}
                    {this.state.isFetchingData == 'showWorkshop' ? (
                        <WorkshopFooter workshop={this.state.workshop} cancelService={this.state.cancelService} />
                    ) :
                        null}
                    <ReceiptViewer isVisible={this.state.isServiceEnded} onCancelDialog={this.onCancelDialog} />
                    <BottomModalFlatListDropDown
                        data={this.props.services}
                        visible={this.state.isServicesVisible}
                        onSelectedPress={this.onSelected}
                        onCancel={this.onCancel}
                    />
                </PageTemplate>

            )
        }
        else {
            return <PageTemplate title={"Book Service"}
                navigation={this.props.navigation}
            >
                <View style={styles.messageView}>
                    <Text style={styles.messageText}>
                        {"CallGenie needs access to location"}
                    </Text>
                </View>
            </PageTemplate>
        }



    }

}

const mapStateToProps = (state) => {
    return {
        services: state.ServiceReducer.services,
        userType: state.AuthReducer.userType,
        customer: state.AuthReducer.customer,
        error: state.BookServiceReducer.error,
        isServiceBooked: state.BookServiceReducer.isServiceBooked,
        workshop: state.BookServiceReducer.workshop,
        workshopLocation: state.BookServiceReducer.workshopLocation,
        appointmentID: state.BookServiceReducer.appointmentID,
        hasMechanicReached: state.BookServiceReducer.hasMechanicReached,
        appointment: state.BookServiceReducer.receipt,
        isBookServiceInAdvance:state.BookServiceReducer.isBookServiceInAdvance,
        bookInAdvanceError:state.BookServiceReducer.bookInAdvanceError
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookARide);
