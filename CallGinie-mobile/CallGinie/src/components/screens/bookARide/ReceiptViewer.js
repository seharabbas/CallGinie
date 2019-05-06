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
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
import { colors } from '../../../config';
import { width, height } from "react-native-dimension";
import StarRating from "react-native-star-rating";

class ReceiptViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: null,
            reviewWorkshop: false,
            mechanicRating:0
        }
        this.cancelModal = this.cancelModal.bind(this);
        this.reviewWorkshop = this.reviewWorkshop.bind(this);
        this.onStarRatingPress = this.onStarRatingPress.bind(this);
        this.rateWorkshop = this.rateWorkshop.bind(this); 
    }
    cancelModal() {
        this.props.resetBookAppointment();
        // this.props.onCancelDialog();
    }
    reviewWorkshop() {
        this.setState({
            reviewWorkshop: true
        })
    }
    onStarRatingPress(rating){
        this.setState({
            mechanicRating:rating
        });

    }
    rateWorkshop(){
        this.props.rateWorkshop(this.state.mechanicRating,this.props.appointmentID);
        this.props.resetBookAppointment();
    }
    render() {
        if (this.state.reviewWorkshop) {
            return (
                <Modal style={styles.bottomModal} isVisible={this.props.isVisible}>
                <View style={[styles.modalContent,,{ height: height(30),marginBottom:30 }]}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={this.cancelModal} >
                                <View>
                                    <Text style={[styles.cancelContent, { color: colors.red }]}>{"Cancel"}</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.addContent}>{""}</Text>
                            </View>
                            <TouchableOpacity onPress={this.rateWorkshop}>
                                <View>
                                    <Text style={[styles.cancelContent, { marginRight: 2 }]}>{"Rate Workshop"}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    <View style={[{flexDirection:"column",justifyContent:"center",alignItems:"center"}]} >
                        <Text style={[styles.serviceText, { fontWeight: '700',marginBottom:20,marginTop:20 }]}>{"Rate your workshop:"}</Text>
                        <StarRating
                            disabled={false}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}  
                            maxStars={5}
                            rating={this.state.mechanicRating}
                            starSize={50}
                            emptyStarColor={"black"}
                            fullStarColor={"#fcaf17"}
                            halfStarColor={"#fcaf17"}
                        />
                    </View>
                    </View>
                </Modal>
            );
        }
        else if (this.props.appointment == null) {
            return (<Modal style={styles.bottomModal} isVisible={this.props.isVisible}>
                <View style={styles.modalContent} >
                    <ActivityIndicator size="large" color={"green"} />
                </View>
            </Modal>);
        } else {


            let AppointmentDetails = this.props.appointment.AppointmentDetails;
            let totalSum = AppointmentDetails.reduce(function (sum, item) {
                let amount = item.TotalAmount.split(' ')[1];
                amount = parseInt(amount)
                return sum = sum + amount;
            }, 0);

            let taxAmount = (totalSum + this.props.appointment.DistanceCharges) * 0.16;
            let totalCharges = taxAmount + totalSum + this.props.appointment.DistanceCharges
            return (
                <Modal style={styles.bottomModal} isVisible={this.props.isVisible}>
                    <View style={styles.modalContent} >
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={this.cancelModal} >
                                <View>
                                    <Text style={[styles.cancelContent, { color: colors.red }]}>{"Cancel"}</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.addContent}>{"Receipt"}</Text>
                            </View>
                            <TouchableOpacity onPress={this.reviewWorkshop}>
                                <View>
                                    <Text style={[styles.cancelContent, { marginRight: 2 }]}>{"Review"}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={styles.fareContainer}>
                                <Text style={styles.fareHeading}>{"Fare Breakdown"}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={[styles.serviceText, { fontWeight: '700' }]}>{"Service Charges"}</Text>
                                <Text style={[styles.serviceTotal, { fontWeight: '700' }]}>{"Rs " + totalSum}</Text>
                            </View>
                            {AppointmentDetails.length > 0 && AppointmentDetails.map((service, key) => {
                                return (
                                    <View key={key} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.serviceText}>{service.ServiceName}</Text>
                                        <Text style={styles.serviceTotal}>{"Rs " + service.TotalAmount}</Text>
                                    </View>
                                );
                            })}
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={[styles.serviceText, { fontWeight: '700' }]}>{"Ride Charges"}</Text>
                                <Text style={[styles.serviceTotal, { fontWeight: '700' }]}>{"Rs " + this.props.appointment.DistanceCharges}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <Text style={[styles.serviceText, { fontWeight: '700' }]}>{"Per Kilometer Charges"}</Text>
                                <Text style={[styles.serviceTotal, { fontWeight: '700' }]}>{"Rs 90"}</Text>
                            </View>
                            <View style={styles.fareContainer}>
                                <Text style={styles.fareHeading}>{"Tax Breakdown"}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <Text style={[styles.serviceText, { fontWeight: '700' }]}>{"Tax 16%"}</Text>
                                <Text style={[styles.serviceTotal, { fontWeight: '700' }]}>{"Rs " + taxAmount}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <Text style={[styles.serviceText, { fontWeight: '700' }]}>{""}</Text>
                                <Text style={[styles.serviceText, { fontWeight: '700' }]}>{"Total"}</Text>
                                <Text style={[styles.serviceTotal, { fontWeight: '700' }]}>{"Rs " + totalCharges}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }


}
const mapStateToProps = (state) => {
    return {
        appointment: state.BookServiceReducer.receipt,
        appointmentID:state.BookServiceReducer.appointmentID
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptViewer);
