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

class BookService extends Component {
    constructor(props) {
        super(props);
        let permissionGranted = false;
        if (Platform.OS == "ios") {
            permissionGranted = true;
        }
        this.state = {
            appointment: null,
            permissionGranted: permissionGranted
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.appointment != nextProps.appointment) {
            this.setState({
                appointment: nextProps.appointment
            });
        }
    }
    componentDidMount() {
        if (Platform.OS == "android") {
            this.requestLocationPermission();
        }
        // else {
        //     //this.getCurrentPosition();
        // }
    }
    getCurrentPosition() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0.05
                });

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1000 },
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
                //  this.getCurrentPosition();
            } else {
                this.setState({
                    permissionGranted: false
                });
            }
        });
    }
    render() {
        if (this.state.appointment == null && this.state.permissionGranted) {
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
                    region={this.state.region}
                >
                </MapView>
                <View style={styles.appointmentContainer}>
                    <View>
                        <Text>
                            {this.state.appointmentDetails.workshopName}
                        </Text>
                        <Text>
                            {this.state.appointmentDetails.workshopRating}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                        <Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </PageTemplate>);
        }

    }
}

const mapStateToProps = (state) => {
    return {
        appointmentDetails: state.AppointmentReducer.appointmentDetails
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookService);
