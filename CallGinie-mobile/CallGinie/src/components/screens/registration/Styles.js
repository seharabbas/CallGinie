import { StyleSheet } from "react-native";
import {width,height} from "react-native-dimension";

export const styles = StyleSheet.create({
    placeholderImage:{
        height:80,
        width:80,
        borderRadius:40
    },
    textInput:{
        marginBottom:5,
        marginLeft:15,
        marginRight:15,
        borderBottomWidth:1,
        borderColor:"#C0CCDA",
        height:40 
    },
    fullNameContainer:{
        marginTop:20,
        marginLeft:20,
        flexDirection:"row",
        justifyContent:"flex-start"
    },
    nameContainer:{
        marginTop:10,
        flexDirection:"column",
        justifyContent:"flex-end"
    },textInputLabel:{
        color: '#00A6FF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'left',
        paddingLeft:15,
    },signUpButton:{
        marginTop:width(20),
        flexDirection:"row",
        justifyContent:"center",
        height:50,
        backgroundColor:'rgba(0, 166, 255, 0.66)',
        borderRadius:5,
        alignItems:"center",
        marginHorizontal:20
    },
    signUpStyle:{
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    }
});