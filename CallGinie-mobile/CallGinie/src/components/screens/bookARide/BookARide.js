import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    TextInput,
    StyleSheet,
    Linking,
    Platform,
    Text,
    Dimensions,
    ActivityIndicator,
    PermissionsAndroid
} from 'react-native';
import { PageTemplate, BottomModalFlatListDropDown, GooglePlacesSearch } from "../../common";
import { width, height } from "react-native-dimension";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from "../../../App_Config";
import styles from "./Styles";
const ASPECT_RATIO = width(100) / height(100);
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import WorkshopFooter from "./WorkshopFooter";

import { DropDownHolder } from  '../../common/DropDownHolder';//'../../common/DropDownHolder';


class BookARide extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        const { params } = this.props.navigation.state;
        let permissionGranted = false;
        if (Platform.OS == "ios") {
            permissionGranted = true;
        }
        else {
          
        }
        this.state = {
            isServicesVisible: false,
            selectedServices: [],
            permissionGranted: permissionGranted,
            origin: null,
            workshop: null,
            workshopLocation:null,
            isFetchingData: 'false',
            cancelService:true,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
        this.timeout=null;
        this.setTimerForServices=this.setTimerForServices.bind(this);
        this.setLocationDetail = this.setLocationDetail.bind(this)
        this.onServiceSelect = this.onServiceSelect.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.bookService = this.bookService.bind(this);
        this.requestCameraPermission=this.requestCameraPermission.bind(this);
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'We need access to you location to book service',
                    message: 'We need access to you location to book service',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({
                    permissionGranted: true
                });
            } else {
                this.setState({
                    permissionGranted: false
                });
            }
        } catch (err) {
            console.warn(err);
        }
    }

    bookService() {
        this.setState({
            isFetchingData: 'true'
        });
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

        location.latitude = latitude;
        bookServiceObj.location = location;
        bookServiceObj.serviceIds = serviceIds;
        this.props.bookAService(bookServiceObj);

    }


    componentDidMount() {
        this.props.getCarServices();
        if (Platform.OS == "android") {
            this.requestCameraPermission();
        }
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
                enableHighAccuracy: true, timeout: 1000, maximumAge: 1000
            },
        );
        this.watchID = navigator.geolocation.watchPosition(
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
            }
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
        if (this.props.error != nextProps.error) {
            this.setState({
                isFetchingData: "false"
            });
        }
        else if(this.props.isServiceBooked!=nextProps.isServiceBooked){
                this.setTimerForServices();
        }
        if (this.props.workshop != nextProps.workshop) {
            this.setState({
                workshop: nextProps.workshop,
                workshopLocation:nextProps.workshopLocation,
                isFetchingData: "showWorkshop"
            });
            if(this.timeout!=null){
                clearTimeout(this.timeout);
            }
        }
        if(this.props.workshopLocation!=nextProps.workshopLocation){
            this.setState({
                workshopLocation:nextProps.workshopLocation
            });
        }
        if(this.props.hasMechanicReached!=nextProps.hasMechanicReached){
            DropDownHolder.getDropDown().alertWithType('success', 'success', "Your mechanic has reached your location");
            this.setState({
                cancelService:false,
                workshopLocation:{...this.state.origin}
            });
        }

    }
    setTimerForServices(){
        this.timeout =setTimeout(()=>{
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
    setLocationDetail(origin, region) {
        this.setState({
            origin: origin,
            region: region
        });
    }

    render() {
        if (this.props.userType == "workshopowner") {
            return (
                <PageTemplate
                    title={"Dashboard"}
                    navigation={this.props.navigation}
                >
                    <View style={styles.messageView}>
                        <Text style={styles.messageText}>
                            {"Keep calm you don't have any appointments"}
                        </Text>
                    </View>
                </PageTemplate>
            )
        } else {
            if (this.state.permissionGranted) {
                return (
                    <PageTemplate
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
                                    key={0}
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
                        {this.state.selectedServices.length > 0 && this.state.isFetchingData == 'false' ? (<TouchableOpacity style={styles.bookService} onPress={this.bookService}>
                            <Text style={styles.bookServiceText}>{"Book Service"}</Text>
                        </TouchableOpacity>) : null}
                        {this.state.isFetchingData == 'true' ? (
                            <View style={styles.isFetchingData}>
                                <Text style={styles.isFetchingDataText}>{"Searching Nearby Workshops ....."}</Text>
                            </View>
                        ) : null}
                        {this.state.isFetchingData == 'showWorkshop' ? (
                             <WorkshopFooter workshop={this.state.workshop}  cancelService={this.state.cancelService}/>
                        ) :
                            null}
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
                            {"CallGenie needs access to location to"}
                        </Text>
                    </View>
                </PageTemplate>
            }



        }
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.ServiceReducer.services,
        userType: state.AuthReducer.userType,
        error: state.BookServiceReducer.error,
        isServiceBooked: state.BookServiceReducer.isServiceBooked,
        workshop: state.BookServiceReducer.workshop,
        workshopLocation:state.BookServiceReducer.workshopLocation,
        appointmentID: state.BookServiceReducer.appointmentID,
        hasMechanicReached:state.BookServiceReducer.hasMechanicReached
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookARide);
