import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Linking,
    ActivityIndicator,
    Text,
} from 'react-native';

import Modal from "react-native-modal";
import styles from "./Styles";


class ReceiptViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: null
        }
    }
    render() {
        if(this.props.appointment==null){
            return(<Modal style={styles.modalContent} isVisible={this.props.isVisible}>
                    <ActivityIndicator size="large" color={"green"} />
            </Modal>);
        }else{
 

        let AppointmentDetails = this.props.appointment.AppointmentDetails;
        let totalSum = AppointmentDetails.reduce(function(sum, item){
            return sum = sum+item.TotalAmount;
        },0);
        
        let taxAmount = (totalSum + this.props.appointment.DistanceCharges)* 0.16;
        let totalCharges=taxAmount+totalSum + this.props.appointment.DistanceCharges
         return (
            <Modal style={styles.modalContent} isVisible={this.props.isVisible}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity>
                        <View>
                            <Text style={[styles.cancelContent, { color: colors.red }]}>{"Cancel"}</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.addContent}>{"Receipt"}</Text>
                    </View>
                    <TouchableOpacity>
                        <View>
                            <Text style={[styles.cancelContent, { marginRight: 2 }]}>{"Review"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.fareContainer}>
                    <Text style={styles.fareHeading}>{"Fare Breakdown"}</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={[styles.serviceText,{fontWeight: '700'}]}>{"Service Charges"}</Text>
                            <Text style={[styles.serviceTotal,{fontWeight: '700'}]}>{"Rs "+totalSum}</Text>
                </View>
                 {AppointmentDetails.length>0 && AppointmentDetails.map((service, key) => {
                    return (
                        <View key={key} style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={styles.serviceText}>{service.ServiceName}</Text>
                            <Text style={styles.serviceTotal}>{"Rs "+service.TotalAmount}</Text>
                        </View>
                    );
                 })}
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={[styles.serviceText,{fontWeight: '700'}]}>{"Ride Charges"}</Text>
                            <Text style={[styles.serviceTotal,{fontWeight: '700'}]}>{"Rs "+this.props.appointment.DistanceCharges}</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
                            <Text style={[styles.serviceText,{fontWeight: '700'}]}>{"Per Kilometer Charges"}</Text>
                            <Text style={[styles.serviceTotal,{fontWeight: '700'}]}>{"Rs 90"}</Text>
                </View>
                <View style={styles.fareContainer}>
                    <Text style={styles.fareHeading}>{"Tax Breakdown"}</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
                            <Text style={[styles.serviceText,{fontWeight: '700'}]}>{"Tax 16%"}</Text>
                            <Text style={[styles.serviceTotal,{fontWeight: '700'}]}>{"Rs "+taxAmount}</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>                            <Text style={[styles.serviceText,{fontWeight: '700'}]}>{"Tax 16%"}</Text>
                    <Text style={[styles.serviceText,{fontWeight: '700'}]}>{""}</Text>
                    <Text style={[styles.serviceText,{fontWeight: '700'}]}>{"Total"}</Text>
                    <Text style={[styles.serviceTotal,{fontWeight: '700'}]}>{"Rs "+totalCharges}</Text>
                </View>
            </Modal>
        )
                }
    }


}
const mapStateToProps = (state) => {
    return {
        appointment:state.BookServiceReducer.appointment
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptViewer);
