import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableHighlight,
  Image
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./Styles";
import { colors } from "../../../config";


export default class ContactListItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.openContactDetail = this.openContactDetail.bind(this);

  }

  openContactDetail() {
    this.props.navigation.navigate({
      key: "ContactDetailView",
      routeName: "ContactDetailView",
      params: {
        contact: this.props.data
      }
    });
  }




  render() {

    return (
      <View style={styles.listItemContainer} >
        <View style={styles.contactNameContainer}>
          <Text style={styles.contactName}>{this.props.data.label}</Text>
          <Text style={styles.price}>{'Rs.'+this.props.data.amount}</Text>
        </View>
        <TouchableOpacity style={{width:50, height:50,justifyContent:'center', alignItems:"flex-end"}}>
        <Icon
          size={20}
          color={colors.dark_grey_1}
          name={"delete"} />
          </TouchableOpacity>
      </View>
    );
  }
}

