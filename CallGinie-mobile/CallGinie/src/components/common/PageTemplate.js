import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    BackHandler,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { width } from '../../../node_modules/react-native-dimension';


class PageTemplate extends Component {
    constructor(props) {
        super(props);
        this.onLeftButtonPress=this.onLeftButtonPress.bind(this);
    }
    onLeftButtonPress(){
        if(this.props.onLeftButtonPress){
            this.props.onLeftButtonPress(); 
        }else{
            
        }
    }
    render() {
        const {
            children,
            iconName,
            title
        } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.safeAreaViewStyle}>
                     <View style={styles.headerContainer}>
                        <TouchableOpacity style={styles.menuIconStyle} onPress={this.onLeftButtonPress} >
                        <Icon
                            size={30} 
                            color={"#FFFFFF"}
                            name={iconName && '' != iconName ? iconName : "menu"} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.menuIconStyle}></View>
                    </View>
                <View style={styles.bodyContainer}>
               
                    {children}
                  </View>
                </SafeAreaView>
            </View>
        )
    }
}


const styles = {
    safeAreaViewStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start',
        backgroundColor:"#00A6FF",
        alignSelf: 'stretch',
    },
    menuIconStyle:{
      width:50,
      paddingLeft:10
    },
    title:{
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
        textAlign: "center"
    },
    bodyContainer:{
        flex:1,
        flexDirection: "column",
        justifyContent: 'flex-start',
        backgroundColor:"#FFFFFF",
    }
    ,headerContainer:{
       height:50,
       flexDirection:"row",
       justifyContent:"space-between",
       alignItems:"center",
       backgroundColor:"#00A6FF"
       
    }
};

export { PageTemplate };