import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as RetroMapStyles from '../../../mapStyles/DayMapStyles';
import { PageTemplate } from "../../common";

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class PinLocation extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
    this.goBack = this.goBack.bind(this);

  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { 
      enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  goBack() {
    this.props.navigation.goBack();
}
  render() {
    return (
      <PageTemplate
      title={"Register Customer"}
      iconName={"chevron-left"}
      onLeftButtonPress={this.goBack}
      >
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        showsMyLocationButton={true}
        showsUserLocation={true}
        // initialRegion={{
        //   latitude:-6.270565,
        //   longitude:106.759550,
        //   latitudeDelta: 1,
        //   longitudeDelta: 1
        //  }}
        region={ this.state.region }
       
      >
        <MapView.Marker
          coordinate={ this.state.region }
        />
      </MapView>
      </PageTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});