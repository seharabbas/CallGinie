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

import styles from "./Styles";


export default class ContactListItem extends React.PureComponent {

    constructor(props){
      super(props);
      this.openContactDetail=this.openContactDetail.bind(this);
      
    }

    openContactDetail(){
      this.props.navigation.navigate({
            key: "ContactDetailView",
            routeName: "ContactDetailView",
            params: {
                contact:this.props.data
            }
        });
    }
  



  render(){
      
        return(   
        <TouchableOpacity  style={styles.listItemContainer} onPress={this.openContactDetail}>
          <View style={styles.contactNameContainer}>
              <Text style={styles.contactName}>{this.props.data.ServiceName}</Text>
         </View>
        </TouchableOpacity>
        );
      }
}

