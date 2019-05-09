import { StyleSheet } from "react-native";
import {width,height} from "react-native-dimension";
import { colors } from "../../../config";

export const styles = StyleSheet.create({

    loader:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,

        flexDirection:"column"
    },
    ListViewStyles:{
        flex:1,
        flexDirection:"column"
    },
    listItemContainer:{
        height:78,
        paddingLeft:20,
        paddingRight:20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:colors.dark_grey_1
    },contactNameContainer:{
            flexDirection:'column',

    },contactName:{
          color: '#47525E',
          fontSize: 16.67,
          fontWeight: '700',
          textAlign: 'left'
    },
    price:{
        color: '#8190A5',
          fontSize: 13.33,
          fontWeight: '400',
          textAlign: 'left'
    },
    plusIcon:{
        height:80,
        width:80,
        borderRadius:80/2,
        position:"absolute",
        bottom:90,
        right:30,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.green
    },
    workshopServicesButton:{
        height:80,
        backgroundColor:'#00A6FF',
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        },
    registerText:{
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },messageView:{
        flex:1,
        height:height(75),
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },messageText:{
        color: colors.green,
        fontSize: 30,
        fontWeight: "400" ,
        textAlign:"center"
    },
    cancelButton:{
        marginHorizontal:20,
        marginBottom:10,
        borderRadius:5,
        backgroundColor:'#47525E',
        justifyContent:"center",
        alignItems:"center",
        height:50
    },cancelText:{
        color: colors.white,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    modalContent: {
        backgroundColor: "white",
        padding: 0,
        borderColor: "rgba(0, 0, 0, 0.1)"
        ,height:height(60),
     },
      modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 55,
        width: "100%",
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderBottomWidth: 0.5
      },
     addContent: {
       fontSize: 16,
       fontWeight: "normal",
       fontStyle: "normal",
       letterSpacing: 0.76,
       textAlign: "left",
       color: "#4a4a4a",
       top: 5
     },
     cancelContent: {
       
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.76,
        textAlign: "left",
        color:colors.light_blue_3,
        top: 5
      },
      bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
        height:height(40)
      },
     fareContainer:{
        marginVertical:20,

        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
     },
     fareHeading:{
        color: '#47525E',
        fontSize: 15,
        fontWeight: '400'
     },
     serviceText:{
        color: '#8190A5',
        fontSize: 15,
        textAlign: 'left'
     },
     serviceTotal:{
        color: '#8190A5',
        fontSize: 15,
        textAlign: 'left'
     },
     appointmentContainer:{
        position: "absolute",
        bottom: 0,
        width:width(100),
        height: height(30),
        backgroundColor: colors.grey ,
     },
});
export default styles;