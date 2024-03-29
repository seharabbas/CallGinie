import {Platform, StyleSheet } from "react-native";
import {width,height} from "react-native-dimension";

//import {commonStyles} from "../../screens/commonStyles"
const styles = StyleSheet.create({
     container: {
        paddingTop:20,
        flex: 1,
        flexDirection:"column",
        backgroundColor: "#026EA7",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingLeft:20
      },
      placeholderImage:{
        height:120,
        width:120,
        borderRadius:60,
        marginTop:height(20),
        marginBottom:20,
        alignSelf:"center"
    },
    ratings:{
        marginBottom:10,
        alignSelf:"center"
    },
    customerName:{
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom:20,
        alignSelf:"center"
    },
    
    navigationItemText:{
        color: '#FFFFFF',
      //  fontFamily: commonStyles.fontFamily,
        fontSize: 16,
        fontWeight: '300',
        
    },
    
    drawerItemText: {
        fontWeight: '500',
        flex: 1,
        marginRight:10
    },

    navigationItem:{
        height:50,
        flexDirection:"row",
        alignItems:'center',//space-between
        borderBottomWidth:1,
        borderColor:"rgba(0, 0, 0, 0.5)",
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor:  'rgba(109, 109, 109, 0.5)',
        shadowOffset: { height: 2, width: 0 },
        paddingLeft:20
    }
    ,
    titleItem:{
        height:60,
        paddingLeft:20, 
        justifyContent:"space-between",
        paddingRight:10
    },
    closeButtonStyle: {
        height: 40,
        width: 40,
        justifyContent: "center"
    },
    drawerItemContainer:{
        height:40,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    drawerItemText:{
        color: '#FFFFFF',
        fontSize: 18.67,
        fontWeight: '500',
        textAlign: 'left'
    }


});
export default styles;