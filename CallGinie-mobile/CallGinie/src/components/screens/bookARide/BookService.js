import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Platform,
    Text
} from 'react-native';
import { PageTemplate, BottomModalFlatListDropDown, GooglePlacesSearch } from "../../common";
import { width, height } from "react-native-dimension";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
import styles from "./Styles";
import Permissions from 'react-native-permissions';
import { colors } from '../../../config';
import StarRating from "react-native-star-rating";
import { GOOGLE_API_KEY } from "../../../App_Config";
import MapViewDirections from 'react-native-maps-directions';
const ASPECT_RATIO = width(100) / height(100);
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as openAnything from 'react-native-openanything';

class BookService extends Component {
    constructor(props) {
        super(props);
        let permissionGranted = false;
        if (Platform.OS == "ios") {
            permissionGranted = true;
        }
        this.state = {
            appointment: null,
            appointmentLocation: null,
            origin: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            distanceTravelled: 0,
            permissionGranted: permissionGranted,
            isServicesVisible: false,
            appointmentID: 0,
            isLocationReached: false
        }
        this.onCancel = this.onCancel.bind(this);
        this.acceptAppointment = this.acceptAppointment.bind(this);
        this.rejectAppointment = this.rejectAppointment.bind(this);
        this.openCall = this.openCall.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.sendLocation = this.sendLocation.bind(this);
        this.reachedLocation=this.reachedLocation.bind(this);
        this.openBill=this.openBill.bind(this);
    }

    getServices(carServices) {
        let services = [];
        let i = 0;
        for (; i < carServices.length; i++) {
            services.push({
                label: carServices[i].ServiceName,
                value: carServices[i].ServiceName
            });
        }
        return services;
    }

    monitorUserLocation() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    origin: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0.05
                    }
                });
                this.sendLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 500 },
        );
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.appointment != nextProps.appointment) {
            if (nextProps.appointment != null) {
                let location = nextProps.appointment.location;
                location.latitudeDelta = 0;
                location.longitudeDelta = 0.05;
                this.setState({
                    appointment: nextProps.appointment,
                    appointmentLocation: location
                });
            }
            else {
                this.setState({
                    appointment: null,
                    appointmentLocation: null
                });
            }

        }
        if (this.props.appointmentID != nextProps.appointmentID) {
            this.monitorUserLocation();
            this.setState({
                appointmentID: nextProps.appointmentID
            });
        }
        if (this.props.isLocationReached != nextProps.isLocationReached) {
            this.setState({
                isLocationReached: true
            })
        }
    }
    componentDidMount() {
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
                    origin: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0.05
                    }
                });
            },
            (error) => console.log(error.message),
            {
                enableHighAccuracy: false,
                timeout: 5000,
            },
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
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
    onCancel() {
        this.setState({
            isServicesVisible: false
        });
    }
    acceptAppointment() {
        this.props.acceptAppointment(this.state.distanceTravelled);
    }
    rejectAppointment() {
        this.props.rejectAppointment();
    }
    reachedLocation(){
        this.props.updateMechanicLocationStatus();
    }

    openCall() {
        openAnything.Call(this.state.appointment.phoneNo).catch(err => { });
    }
    openMessage() {
        openAnything.Text(this.state.appointment.phoneNo).catch(err => { });

    }
    openBill(){
        this.props.navigation.navigate("Bill", {
            params: {
                carServices:this.state.appointment.carServices
            }
        });
    }
    sendLocation(location) {
        let appointmentID = this.state.appointmentID;
        if (appointmentID > 0) {
            let mechanicLocation = {
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude
                },
                appointmentID: appointmentID
            }
            this.props.updateMechanicLocation(mechanicLocation);
        }

    }

    render() {
        if (this.state.appointment == null) {
            return (<PageTemplate
                title={"Book Service"}
                navigation={this.props.navigation}
            >
                <View style={styles.messageView}>
                    <Text style={styles.messageText}>
                        {"Keep calm you don't have any appointments"}
                    </Text>
                </View>

            </PageTemplate>
            )
        }
        else if (this.state.permissionGranted == false && this.state.appointment != null) {
            return (<PageTemplate
                title={"Book Service"}
                navigation={this.props.navigation}
            >
                <View style={styles.messageView}>
                    <Text style={styles.messageText}>
                        {"Please allow us to access location to accept the appointment"}
                    </Text>
                </View>
            </PageTemplate>
            );
        }
        else {
            let customerRating = parseInt(this.state.appointment.customerRating);
            let services = this.getServices(this.state.appointment.carServices);
            return (<PageTemplate
                title={"Book Service"}
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
                    region={this.state.appointmentLocation}
                >
                    {this.state.origin != null ? (<MapView.Marker
                        coordinate={this.state.origin}
                        key={0}
                    >
                        <Icon
                            size={40}
                            style={{ Top: 50 }}
                            color={colors.purple}
                            name={"screwdriver"} />
                    </MapView.Marker>
                    ) : null}
                    {this.state.appointmentLocation != null ?
                        (<MapView.Marker
                            coordinate={this.state.appointmentLocation}
                            key={1}
                        >
                            <Icon
                                size={40}
                                style={{ Top: 50 }}
                                color={colors.chili_red}
                                name={"car"} />
                        </MapView.Marker>
                        ) : null}
                    {this.state.appointmentLocation != null ?
                        (<MapViewDirections
                            origin={this.state.origin}
                            destination={this.state.appointmentLocation}
                            apikey={GOOGLE_API_KEY}
                            strokeWidth={5}
                            strokeColor="green"
                            optimizeWaypoints={true}
                            onReady={result => {
                                console.log('Distance: ${result.distance} km')
                                console.log('Duration: ${result.duration} min.')
                                this.setState(
                                    {
                                        distanceTravelled: result.distance
                                    });
                            }}
                        />) : null}
                </MapView>
                <View style={[styles.appointmentContainer,this.state.appointmentID > 0 ? { height: height(40) } : {}]}>
                    <View style={styles.workshopView}>
                        <Text style={styles.customerName}>
                            {this.state.appointment.customerName}
                        </Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={customerRating}
                            starSize={20}
                            emptyStarColor={colors.lightest_greys}
                            fullStarColor={"#fcaf17"}
                            halfStarColor={"#fcaf17"}
                        />
                    </View>
                    {this.state.appointmentID > 0 ? (
                        <View style={styles.workshopView}>
                            <View />
                            <TouchableOpacity style={[styles.acceptButton, { backgroundColor: "transparent" }]} onPress={this.openCall}>
                                <Icon
                                    size={50}
                                    style={{ marginRight: 30 }}
                                    color={colors.white}
                                    name={"phone"} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.acceptButton, { backgroundColor: "transparent" }]} onPress={this.openMessage}>
                                <Icon
                                    size={50}
                                    color={colors.white}
                                    name={"forum"} />
                            </TouchableOpacity>
                        </View>
                    ):(<View style={styles.workshopView}>
                            <View />
                            <TouchableOpacity style={styles.acceptButton} onPress={this.acceptAppointment}>
                                <Text style={styles.acceptButtonText}>{"Accept"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton} onPress={this.rejectAppointment}>
                                <Text style={styles.acceptButtonText}>{"Reject"}</Text>
                            </TouchableOpacity>
                        </View>)}
                    <TouchableOpacity style={styles.viewServicesButton} onPress={() => { this.setState({ isServicesVisible: true }) }}>
                        <Text style={styles.acceptButtonText}>{"View Services"}</Text>
                    </TouchableOpacity>
                    {this.state.appointmentID > 0 && !this.state.isLocationReached ? (<View style={styles.generateBillContainer}>
                        <TouchableOpacity style={styles.generateBillButton} onPress={this.reachedLocation}>
                            <Text style={styles.acceptButtonText}>{"Reached Location"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.generateBillButton} onPress={this.rejectAppointment}>
                            <Text style={styles.acceptButtonText}>{"Cancel Service"}</Text>
                        </TouchableOpacity>
                    </View>) : null}
                    {this.state.isLocationReached ? (<TouchableOpacity style={styles.viewServicesButton} onPress={this.openBill}> 
                        <Text style={styles.acceptButtonText}>{"Generate Bill"}</Text>
                    </TouchableOpacity>
                    ) : null}
                </View>
                <BottomModalFlatListDropDown
                    data={services}
                    visible={this.state.isServicesVisible}
                    //onSelectedPress={this.onSelected}
                    isReadOnly={true}
                    onCancel={this.onCancel}
                />
            </PageTemplate>);
        }

    }
}

const mapStateToProps = (state) => {
    return {
        appointment: state.AppointmentReducer.appointmentDetails,
        appointmentID: state.AppointmentReducer.appointmentID,
        isLocationReached: state.AppointmentReducer.isLocationReached
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookService);
