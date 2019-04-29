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
import { PageTemplate, BottomModalFlatListDropDown } from "../../common";
import { width, height } from "react-native-dimension";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const ASPECT_RATIO = width(100) / height(100);
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
            isServicesVisible: false,
            selectedServices:[],
            origin:null,
            isFetchingData:false,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
        this.onServiceSelect = this.onServiceSelect.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.bookService=this.bookService.bind(this);
    }
    bookService(){
        this.setState({
            isFetchingData:true
        });
    }
    componentDidMount() {
        this.props.getCarServices();
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
        if (this.props.isRegisterSuccessfully != nextProps.isRegisterSuccessfully) {
            this.setState({
                isSigningUp: false
            });
        }
    }
    onSelected(selectedList){
        this.setState({
            selectedServices:[...selectedList],
            isServicesVisible:false
        })
    }
    onCancel(){
        this.setState({
            isServicesVisible:false
        });
    }

    render() {
        if(this.props.userType=="workshopowner"){
                    return(
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
        }else{
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
                
                <TouchableOpacity style={styles.serviceContainer} onPress={() => { this.onServiceSelect() }}>
                        <Text style={styles.serviceText}>{"Tell me what's wrong"}</Text>
                        {this.state.selectedServices.length>0?(<View style={{marginRight:5}}>
                        <Icon
                            size={30} 
                            color={colors.dark_grey_1}
                            name={"delete-variant"} />
                            <View style={styles.itemContainer}>
                            <Text style={{color:colors.white,fontSize:14}}>{this.state.selectedServices.length}</Text>
                            </View>
                        </View>):null}
                </TouchableOpacity>
                <View style={[styles.servicesContainer,{ paddingTop: 20, flex: 1 }]}>
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
                {this.state.selectedServices.length>0 && !this.state.isFetchingData?(<TouchableOpacity style={styles.bookService} onPress={this.bookService}>
                    <Text style={styles.bookServiceText}>{"Book Service"}</Text>
                </TouchableOpacity>):null}
                {this.state.isFetchingData?(
                    <View>
                        <Text>{"We are finding help from you0"}</Text>
                    </View>
                ):null}
                <BottomModalFlatListDropDown
                    data={this.props.services}
                    visible={this.state.isServicesVisible}
                    onSelectedPress={this.onSelected}
                    onCancel={this.onCancel}
                />


            </PageTemplate>

        )
                }

    }

}


const mapStateToProps = (state) => {
    return {
        services: state.ServiceReducer.services,
        userType: state.AuthReducer.userType
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookARide);
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1
    },
    serviceContainer: {
        width:width(90),
        height: height(8),
        backgroundColor: "white",
        marginLeft: 20,
        borderWidth: 0.33,
        borderRadius: 2,
        borderColor: "#47525E",
        marginRight: 10,
        paddingLeft: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position:'absolute',
        top:120

    }
    ,itemContainer:{
        position:'absolute',
        right:0,
        backgroundColor:colors.red,
        height:20,
        alignItems: "center",
        width:20,
        borderRadius:10,
        shadowOpacity: 0.75,
        shadowColor: 'rgba(0,0,0,0.5)',//colors.shadow_Grey,
        shadowOffset: {
          width: 3,
          height: 5
        },
        elevation:3
        
    },
    serviceText:{
        color: '#343F4B',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'left'
    },
    bookService:{
        width:width(90),
        height: height(8),
        backgroundColor: "#5A6978",
        marginLeft: 20,
        borderWidth: 0.33,
        borderRadius: 2,
        borderColor: "#47525E",
        marginRight: 10,
        paddingLeft: 20,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        position:'absolute',
        bottom:height(10)
    },
    bookServiceText:{
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    messageView:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },messageText:{
        color: colors.green,
        fontSize: 30,
        fontWeight: "400" ,
        textAlign:"center"
    },
    servicesContainer: {
      width:width(90),
      marginLeft:20,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      position:'absolute',
      top:30
    },

});