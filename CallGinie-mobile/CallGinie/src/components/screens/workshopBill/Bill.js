import React, { Component } from 'react';
import {
    FlatList,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Text
} from 'react-native';
import { styles } from "./Styles";
import { PageTemplate, BottomModalFlatListDropDown } from "../../common";
import { width, height } from "react-native-dimension";
import { DropDownHolder } from '../../common/DropDownHolder';
import Row from "./Row";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";
import { colors } from '../../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReceiptViewer from "./Receipt";

class Bill extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        const carServices = params ? params.carServices : null;
        const appointmentID = params ? params.appointmentID: null;
        this.state = {
            workshopServices: carServices,
            isRefreshing: false,
            selectedServices: [],
            appointmentID:appointmentID,
            isBillGenerated:false
            ,isBillSubmitted:false
        }
        this.onServiceSelect = this.onServiceSelect.bind(this);
        this.onPullToRefreshList = this.onPullToRefreshList.bind(this);
       // this.renderSectionFooter = this.renderSectionFooter.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.noDataComponent = this.noDataComponent.bind(this);
        this.addWorkshopServices = this.addWorkshopServices.bind(this);
        this.onRemoveService = this.onRemoveService.bind(this);
        this.renderItem=this.renderItem.bind(this);
        this.onCancelDialog= this.onCancelDialog.bind(this);
        this.generateBill=this.generateBill.bind(this);
    }
    componentWillMount() {
        this.props.getCarServices();
    }
    
    noDataComponent() {
        return (<View style={styles.messageView}>
            <Text style={styles.messageText}>{"No services registered"}</Text>
        </View>
        )
    }
    onCancelDialog(){
        this.setState({
            isBillGenerated:false
        });
        this.props.navigation.goBack();   
        this.props.resetAppointment()
         
    }

    onCancel() {
        this.setState({
            isServicesVisible: false
        })
    }
    onSelected(selectedList) {
        let services=[];
        let workshopServices=[...this.state.workshopServices];
        for(i=0;i<selectedList.length;i++){ 
            let currentService = selectedList[i];
            let index= workshopServices.findIndex(x=>x.ServiceId==currentService.value);
            if(index == -1){
                workshopServices.push({
                    ServiceId:parseInt(currentService.value),
                    ServiceName:currentService.label,
                    TotalAmount:currentService.amount
                });
            }
        }
        this.setState({
            workshopServices:workshopServices,
            selectedServices: [...selectedList],
            isServicesVisible: false
        });
    }
    onRemoveService(serviceValue){
        let workshopServices = [...this.state.workshopServices];
        let ServiceID=parseInt(serviceValue);
        let index = workshopServices.findIndex(x=>x.ServiceId==ServiceID);
        if(index > -1){
            workshopServices.splice(index,1);
        }
        this.setState({
            workshopServices:workshopServices
        });
    }
    onServiceSelect() {
        this.setState({
            isServicesVisible: true
        })
    }
    onPullToRefreshList() {
        this.props.getCarServices();
        this.setState({
            isRefreshing: true
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                carServices: nextProps.services,
                
            });
        
        }
        if(this.props.isBillGenerated!=nextProps.isBillGenerated && nextProps.isBillGenerated){
            this.setState({
                isBillGenerated:true
            });
        }
    }
    renderItem(data) {
        let { item, index } = data;
        return (
            <Row
                data={item}
                onRemoveService={this.onRemoveService}
            />
        )
    }
    onServiceSelect() {
        this.setState({
            isServicesVisible: true
        })
    }
    addWorkshopServices() {
        let serviceIds = [];
        let i = 0;
        for (; i < this.state.selectedServices.length; i++) {
            let id = parseInt(this.state.selectedServices[i].value);
            serviceIds.push(id);
        }
        this.props.addWorkshopServices(serviceIds);
    }
    generateBill(){
        let carServices=[];
        for(i=0;i<this.state.workshopServices.length;i++){
            carServices.push(this.state.workshopServices[i].ServiceId);
        }
        let appointmentDTO={
            iApptid:this.state.appointmentID,
            serviceIds:carServices
        }
        this.props.updateAppointmentDetail(appointmentDTO);
    }

    render() {
        return (<PageTemplate
            title={"Car Services"}
            navigation={this.props.navigation}
        >
            <FlatList
                onRefresh={this.onPullToRefreshList}
                refreshing={this.state.isRefreshing}
                style={styles.ListViewStyles}
                data={this.state.workshopServices}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}
                ListEmptyComponent={this.noDataComponent}
                ListFooterComponent={this.renderSectionFooter}
            />
            <TouchableOpacity style={styles.workshopServicesButton} onPress={this.generateBill} >
            <Text style={styles.registerText}>{"Generate Bill"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plusIcon} onPress={() => { this.onServiceSelect() }}>
                <Icon
                    size={30}
                    color={colors.white}
                    name={"plus"} />
            </TouchableOpacity>
            <ReceiptViewer 
                isVisible={this.state.isBillGenerated}
                onCancelDialog={this.onCancelDialog}
                appointmentID={this.state.appointmentID}
                />
            <BottomModalFlatListDropDown
                data={this.props.services}
                visible={this.state.isServicesVisible}
                onSelectedPress={this.onSelected}
                onCancel={this.onCancel}
            />
        </PageTemplate>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        services: state.ServiceReducer.services,
        isBillGenerated:state.AppointmentReducer.isBillGenerated
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bill);