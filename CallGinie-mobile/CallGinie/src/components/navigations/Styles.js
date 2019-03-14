import {Platform, StyleSheet } from "react-native";
import {commonStyles} from "../../screens/commonStyles"
const styles = StyleSheet.create({
     container: {
        paddingTop:20,
        flex: 1,
        backgroundColor: "#026EA7",
      },
      placeholderImage:{
        height:80,
        width:80,
        borderRadius:40
    },
    
    navigationItemText:{
        color: '#FFFFFF',
        fontFamily: commonStyles.fontFamily,
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
    }

});
export default styles;