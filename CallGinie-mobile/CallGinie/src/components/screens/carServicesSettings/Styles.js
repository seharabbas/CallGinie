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
    }
});
export default styles;