import { StyleSheet } from "react-native";
import {width,height} from "react-native-dimension";
import {colors} from '../../../config'
export const styles = StyleSheet.create({
    container:{
        marginTop:height(25),
        backgroundColor:'#005989',
        flex:1,
        flexDirection:"column"
    },
    profile:{
        height:140,
        width:140,
        borderRadius:70,
        borderWidth:1,
        borderColor:colors.grey_1,
        position:'absolute',
        top:-60,
        backgroundColor:"white",
        left:width(30)
    },
    nameView:{
        marginTop:60,
        justifyContent:"center",
        alignSelf:"center",
        height:100
    },
    name:{
        color: colors.white,
        fontSize: 20,
        textAlign:'center',
        fontWeight: '700',
        marginBottom:10
    },
    ratings:{
        marginBottom:10,
        alignSelf:"center"
    },
    description:{
       alignItems:"flex-start",
       justifyContent:"flex-start",
       marginTop:20
    },
    descriptionDetail:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginLeft:20,
        marginRight:20,
        alignItems:"center",
        width:width(90),
        marginBottom:20
    },
    descriptionDetailText:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
       
    },
    editIcon:{
        flexDirection:"row",
        justifyContent:"flex-end",
        marginTop:10,
        marginRight:10
    }
});