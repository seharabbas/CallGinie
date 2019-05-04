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
import { styles } from './Styles';
const profile = require('../../../assets/profile.png');
import StarRating from "react-native-star-rating";


class Profile extends Component {
    render() {
        return (<PageTemplate
            title={"Profile"}
            navigation={this.props.navigation}
        >
            <View style={styles.container}>
                <Image source={profile} resizeMode={"contain"} style={styles.profile} />
                <View style={styles.editIcon}>
                <TouchableOpacity style={{height:50,width:50,justifyContent:"flex-end"}}>
                <Icon
                    size={30} 
                    color={colors.white}
                    name={"pencil"} />
                </TouchableOpacity>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{this.props.customer.FullName}</Text>  
                    <StarRating
                        disabled={true}
                        containerStyle={styles.ratings}
                        maxStars={5}
                        rating={3}
                        starSize={30}
                        emptyStarColor={"white"}
                        fullStarColor={"#fcaf17"}
                        halfStarColor={"#fcaf17"}
                    />
                </View>
                <View style={styles.description}>
                    <View style={styles.descriptionDetail}>
                        <Text style={styles.descriptionDetailText}>Email</Text>
                        <Text style={styles.descriptionDetailText}>{this.props.customer.Username?this.props.customer.Username:"N/A"}</Text>
                    </View>
                    <View style={styles.descriptionDetail}>
                        <Text style={styles.descriptionDetailText}>Phone No</Text>
                        <Text style={styles.descriptionDetailText}>{this.props.customer.phoneNo?this.props.customer.phoneNo:"N/A"}</Text>
                    </View>
                </View>
            </View>
        </PageTemplate>);
    }
}

const mapStateToProps = (state) => {
    return {
        customer: state.AuthReducer.customer
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);