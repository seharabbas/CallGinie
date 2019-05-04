import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { Component } from 'react';
import { GOOGLE_API_KEY } from "../../App_Config";



class GooglePlacesSearch extends Component {
    constructor(props){
        super(props);
        this.setLocationDetail=this.setLocationDetail.bind(this);
    }
    setLocationDetail(location,region){
        this.props.setLocationResult(location,region);
    }
    render(){
        return(
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
                let latitude = details.geometry.location.lat;
                let longitude = details.geometry.location.lng;
                let origin = { latitude: latitude, longitude: longitude }
                let region = {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                 
                };
                this.setLocationDetail(origin,region);
                // this.setState({
                //     origin: origin,
                //     region: region
                // });
            }}
            getDefaultValue={() => {
                return ""; // text input default value
            }}
            query={{
                key: GOOGLE_API_KEY,
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
                row: {
                    backgroundColor: "white"
                }
            }}
            currentLocation={false}
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
        );
    }
}


export { GooglePlacesSearch };

