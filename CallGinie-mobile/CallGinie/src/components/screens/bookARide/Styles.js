import { width, height } from "react-native-dimension";
import { colors } from '../../../config';
import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1
    },
    serviceContainer: {
        width: width(90),
        height: height(8),
        backgroundColor: "white",
        marginLeft: 20,
        borderWidth: 0.33,
        borderRadius: 2,
        borderColor: "#47525E",
        marginRight: 10,
        paddingLeft: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: 'absolute',
        top: 120

    }
    , itemContainer: {
        position: 'absolute',
        right: 0,
        backgroundColor: colors.red,
        height: 20,
        alignItems: "center",
        width: 20,
        borderRadius: 10,
        shadowOpacity: 0.75,
        shadowColor: 'rgba(0,0,0,0.5)',//colors.shadow_Grey,
        shadowOffset: {
            width: 3,
            height: 5
        },
        elevation: 3

    },
    serviceText: {
        color: '#343F4B',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'left'
    },
    isFetchingData: {
        width: width(100),
        height: 150,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#5A6978',
        alignItems: "center",
        justifyContent: "center"
    },
    isFetchingDataText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: "center"
    },
    bookService: {
        width: width(90),
        height: height(8),
        backgroundColor: "#5A6978",
        marginLeft: 20,
        borderWidth: 0.33,
        borderRadius: 2,
        borderColor: "#47525E",
        marginRight: 10,
        paddingLeft: 20,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        position: 'absolute',
        bottom: height(10)
    },
    bookServiceText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    messageView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }, messageText: {
        color: colors.green,
        fontSize: 30,
        fontWeight: "400",
        textAlign: "center"
    },
    servicesContainer: {
        width: width(90),
        marginLeft: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: 'absolute',
        top: 30
    },
    workshopDetail:{
        height:200,
        backgroundColor: "#EFF2F7",
        width: width(100),
        bottom:0,
        position:'absolute',

    },
    workshopImage:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        position:"absolute",
        left:50, 
        top:-100,
         height:120,
         width:width(80)
    },
    workshopDetailContainer:{
        marginTop:30,
        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:5
    },
    actionsContainer:{
        marginVertical:10,
        flexDirection:"row",
        justifyContent: 'space-between',
        marginHorizontal:20
    },
    workshopName:{
        color: '#47525E',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'left'
    },cancelButton:{
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
    }
});
export default styles;