import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Linking,
    Text,
} from 'react-native';
import { width, height } from "react-native-dimension";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../config';

import ViewOverflow from 'react-native-view-overflow';
import StarRating from "react-native-star-rating";
import styles from "./Styles";
import * as openAnything from 'react-native-openanything';

const workshop = require('../../../assets/workshop.jpg');
const uberIcon = require('../../../assets/uber.png');
const uberURL='uber://?client_id=Q_EJvyvpCZ577bYN_zQXdQfGCddA1kMc&action=setPickup';
export default class WorkshopFooter extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            workshop: this.props.workshop,
            isUberDisabled:false
        }
        this.openUber = this.openUber.bind(this);
        this.openCall=this.openCall.bind(this);
        this.openMessage=this.openMessage.bind(this);
    }

    componentDidMount() {
        Linking.canOpenURL(uberURL)
        .then((supported) => {
            if (!supported) {
              this.setState({
                isUberDisabled:true
              });
            } else {
                this.setState({
                    isUberDisabled:false
                  });
            }
        })
        .catch((err) => console.error('An error occurred', err));
    }
    openUber() {
        if(!this.state.isUberDisabled){
            Linking.openURL(uberURL);
        }
        else{
            alert("Install Uber first to call a ride");
        }
       
    }

    openCall(){
        openAnything.Call('+155555555555').catch(err => {});
    }
    openMessage(){
        openAnything.Text('+155555555555').catch(err => {});

    }
    render() {
        return (
            <ViewOverflow style={styles.workshopDetail}>
                <View>
                    <Image source={workshop} resizeMode={"cover"} style={styles.workshopImage} />
                </View>
                <View style={styles.workshopDetailContainer}>
                    <Text style={styles.workshopName}>{this.state.workshop.name}</Text>
                    <StarRating
                        disabled={true}
                        // containerStyle={styles.ratings}
                        maxStars={5}
                        rating={3}
                        starSize={20}
                        emptyStarColor={"black"}
                        fullStarColor={"#fcaf17"}
                        halfStarColor={"#fcaf17"}
                    />
                </View>
                <View style={styles.actionsContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ height: 60, width: 80 }} onPress={this.openCall}>
                            <Icon
                                size={50}
                                style={{ marginRight: 30 }}
                                color={colors.blue_dark}
                                name={"phone"} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 60, width: 60 }}  onPress={this.openMessage}>
                            <Icon
                                size={50}
                                color={colors.blue_dark}
                                name={"forum"} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ height: 60, width: 60 }} onPress={this.openUber}>
                        <Image
                            source={uberIcon}
                            style={{ height: 60, width: 60 }}
                            resizeMode={"cover"}
                        />
                    </TouchableOpacity>
                </View>
                {this.props.cancelService?(<TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelText}>{"Cancel Service"}</Text>
                </TouchableOpacity>):null}
            </ViewOverflow>
        );

    }
}