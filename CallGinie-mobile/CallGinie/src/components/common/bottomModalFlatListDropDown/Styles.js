import {Platform, StyleSheet } from "react-native";
import {colors} from "../../../config";
import { width, height, totalSize } from 'react-native-dimension';


const styles = StyleSheet.create({

    bottomModal: {
       justifyContent: "flex-end",
       margin: 0,
       height:height(40)
     },
     listView: {
       flex: 1,
       height:300
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
     modalContent: {
       backgroundColor: "white",
       padding: 0,
       borderColor: "rgba(0, 0, 0, 0.1)"
       ,height:height(60)
     },
     listItemContainer:{
        flex:1,
        flexDirection:"row",
        backgroundColor: colors.white,
        height:50,
        borderColor:colors.light_grey_11,
        borderBottomWidth:1,
        
        justifyContent:'space-between',
     
    },
    nameContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginLeft:20,
        marginRight:20
    },
      name:{
        color: '#4A4A4A',
       
        fontSize:16,
     
      },
      inputSearchStyle:{
          backgroundColor:colors.white,
     },
    searchBar:{
        flexDirection:"row",
        backgroundColor:colors.grey,
        height: 80,
        borderColor:colors.white,
        alignItems:"center"
      },
       emptyListContainer:{
       flex:1,
       flexDirection:"row",
       marginTop:height(20),
       justifyContent:"center"
      },
      emptyListText:{
        color: '#4A4A4A',
       
        fontSize:23,
      },
});
export default styles;