import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions,Text,TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as RetroMapStyles from '../../../mapStyles/DayMapStyles';
import { width, height } from "react-native-dimension";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { PageTemplate } from "../../common";
import { colors } from '../../../config';
const ASPECT_RATIO = width(100) / height(100);
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
      },
      origin:null,
      searchPlace:false
    };
    this.goBack = this.goBack.bind(this);
    this.searchPlace=this.searchPlace.bind(this);
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

  searchPlace(){
    this.setState({
      searchPlace:true
    })
  }
  render() {
    return (
      <PageTemplate
        title={"Pin Workshop Location"}
        iconName={"chevron-left"}
        onLeftButtonPress={this.goBack}
      >
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.container}
            showsMyLocationButton={true}
            zoomEnabled={true}
            scrollEnabled={true}
            loadingEnabled = {true}
            loadingIndicatorColor="#666666"
            loadingBackgroundColor="#eeeeee"
            moveOnMarkerPress = {false}
            showsUserLocation={true}
            showsScale={true}
            showsUserLocation={true}
            animateToRegion
            region={this.state.region}

        >
         {this.state.origin!=null?(<MapView.Marker
            coordinate={this.state.origin}
            key={0}
            title={"conrad"}
            
            />):null} 
          </MapView>
        {/* <TouchableOpacity style={styles.serviceContainer} onPress={this.searchPlace}>
          <Text style={styles.searchText}>{"Search Your Workshop"}</Text>
        </TouchableOpacity> */}

         <View style={[styles.serviceContainer,{ paddingTop: 20, flex: 1 }]}>
                    <GooglePlacesAutocomplete
                        placeholder="Search"
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        returnKeyType={"search"}
                        listViewDisplayed="false"
                        fetchDetails={true}
                        renderDescription={row =>
                            row.description || row.formatted_address || row.name
                        }
                        onPress={(data, details = null) => {
                          let latitude=details.geometry.location.lat;
                          let longitude=details.geometry.location.lng;
                          let origin={latitude:latitude,longitude:longitude}
                          let latitudeDelta=latitude;
                          let longitudeDelta=latitude * ASPECT_RATIO;
                          let region ={
                              latitude: latitude,
                              longitude: longitude,
                              latitudeDelta: 0.0043,
                              longitudeDelta: 0.0034
                            };
                          this.setState({
                            origin:origin,
                            region:region
                          });
                        }}
                        getDefaultValue={() => {
                            return ""; // text input default value
                        }}
                        query={{
                            key: "AIzaSyAVJOZw-qv_3s-EX4mlDsXaFWeQJQC1NlM",
                            language: "en",
                            components: 'country:pk'
                            // language of the results
                        }}
                        styles={{
                            description: {
                                fontWeight: "bold"
                            },
                            predefinedPlacesDescription: {
                                color: "#1faadb"
                            },
                            row:{
                              backgroundColor:"white"
                            }
                        }}
                        currentLocation={true} 
                        enablePoweredByContainer={false}
                        GooglePlacesSearchQuery={{
                            rankby: "distance",
                        }}
                        filterReverseGeocodingByTypes={[
                            "locality",
                            "administrative_area_level_3"
                        ]}
                        debounce={200}
                    />
                </View>
                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerText}>{"Register"}</Text>
                </TouchableOpacity>
      </PageTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  serviceContainer: {
    width:width(90),
    marginLeft:20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    position:'absolute',
    top:30
  },registerButton:{
    height:50,
    width:width(70),
    backgroundColor:'#00A6FF',
    bottom:60,
    position:'absolute',
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginLeft:width(10),
    marginRight:30
  },
  registerText:{
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  }
});