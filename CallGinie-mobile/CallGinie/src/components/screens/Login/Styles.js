import { StyleSheet } from "react-native";

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
    }

});