import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator
} from 'react-native';
//import { styles } from "./Styles";

import { PageTemplate } from "../../common";
//import { width, height } from "react-native-dimension";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const placeholder = require('../../../assets/placeholder.png');


class BookARide extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        const { params } = this.props.navigation.state;
        this.state = {
            region: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          };
    }
    goBack() {
        this.props.navigation.goBack();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isRegisterSuccessfully != nextProps.isRegisterSuccessfully) {
            this.setState({
                isSigningUp: false
            });
        }
    }

    render() {
        return (
            <PageTemplate
                title={"Book A Ride"}
                navigation={this.props.navigation}
            >
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    showsScale={true}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: -6.270565,
                        longitude: 106.759550,
                        latitudeDelta: 1,
                        longitudeDelta: 1
                    }}
                    region={this.state.region}

                >
                <TouchableOpacity style={styles.serviceContainer}>
                    <Text>{"Select Service"}</Text>
                </TouchableOpacity>
                </MapView>
            </PageTemplate>
        )

    }

}
const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:"column",
      justifyContent:"flex-start"
    },
    serviceContainer:{
        flexDirection:"row",
        height:56,
        backgroundColor:"white",
        marginTop:10,
        marginLeft:10,
        b
        marginRight:10,
        paddingLeft:20,
        alignItems:"center"
    }
  });
const mapStateToProps = (state) => {
    return {
        isRegisterSuccessfully: state.RegisterReducer.isRegisterSuccessfully,
        error: state.RegisterReducer.error
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookARide);