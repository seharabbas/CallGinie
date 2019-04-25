import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions,Text,TouchableOpacity,ActivityIndicator } from 'react-native';
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
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";

 class PinLocation extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    let workshop = params ? params.workshop:null;
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      workshop:workshop,
      origin:null,
      searchPlace:false,
      isSigningUp:false
    };
    this.goBack = this.goBack.bind(this);
    this.searchPlace=this.searchPlace.bind(this);
    this.registerWorkshop=this.registerWorkshop.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.isRegisterSuccessfully!=nextProps.isRegisterSuccessfully){
        this.setState({
            isSigningUp:false
        });
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.goBack();
    }
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
  registerWorkshop(){
      let workshop=this.state.workshop;
      let latitude=this.state.origin==null?this.state.region.latitude:this.state.origin.latitude;
      let longitude=this.state.origin==null?this.state.region.longitude:this.state.origin.longitude;
      workshop.longitude=longitude;
      workshop.latitude=latitude;
      this.setState({isSigningUp:true});
      this.props.registerWorkshop(workshop);
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
                <TouchableOpacity style={styles.registerButton} onPress={this.registerWorkshop}>
                {this.state.isSigningUp
                        ?(<ActivityIndicator style={styles.signUpStyle} color={"#FFFFFF"} size={"small"}/>):
                     <Text style={styles.registerText}>{"Register"}</Text>}
                </TouchableOpacity>
      </PageTemplate>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      isRegisterSuccessfully:state.RegisterReducer.isRegisterSuccessfully,
      error:state.RegisterReducer.error
  }
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PinLocation);

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
  },
  signUpStyle:{
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
}
});