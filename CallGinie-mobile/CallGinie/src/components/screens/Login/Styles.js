import { StyleSheet } from "react-native";
import {width,height} from "react-native-dimension";

export const styles = StyleSheet.create({

    background:{
        backgroundColor:"#4397FC",
        flex:1,
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center",
        paddingTop:30
    }
    ,logo:{
        height:200,
        width:125,
        paddingTop:40
    },
    textInput:{
        marginBottom:5,
        paddingLeft:15,
        paddingRight:15,
        borderBottomWidth:1,
        borderColor:"white",
        width:300,
        height:40
    },
    logoText:{
       fontSize:30,
       color:"white",
       textAlign:"center",
       marginTop:10
    },
    registerButtonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
     },
    registeredButton:{
        width: width(40),
        height: height(20),
        borderRadius:5,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        marginRight:15
    },
    registerImage:{
        width: height(10),
        height:height(10),
        borderRadius:height(10)/2,
        marginBottom:5
    },
    registerText:{
        color: '#969FAA',
        fontSize:18,
        fontWeight:"500",
        textAlign:"center"
    },
    loginTextStyle:{
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    loginButton:{
        marginTop:30,
        flexDirection:"row",
        justifyContent:"center",
        height:50,
        backgroundColor:"#47525E",
        borderRadius:5,
        alignItems:"center",
    }

});