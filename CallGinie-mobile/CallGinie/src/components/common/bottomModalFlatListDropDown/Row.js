import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight,
  Image
} from "react-native";
import { colors } from "../../../config";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "./Styles";


export default class Row extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect() {
    this.props.onSelect(this.props.data);
  }

  render() {
    const value = this.props.data.value;
    const label = this.props.data.label
    return (
      <TouchableHighlight key={this.props.index + value} underlayColor={colors.light_blue_3} style={styles.listItemContainer}
       onPress={this.onSelect}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{label}</Text>
         {this.props.isSelected?(<Icon
          size={20}
          color={colors.dark_grey_1}
          name={"check"} />):null}
        </View>
       
      </TouchableHighlight>
    );
  }
}