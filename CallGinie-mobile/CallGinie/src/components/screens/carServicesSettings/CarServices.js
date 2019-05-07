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

class CarServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshopServices: [],
            isRefreshing: false,
            selectedServices:[]
        }
        this.onServiceSelect=this.onServiceSelect.bind(this);
        this.onPullToRefreshList = this.onPullToRefreshList.bind(this);
        this.renderSectionFooter = this.renderSectionFooter.bind(this);
        this.onSelected=this.onSelected.bind(this);
        this.onCancel=this.onCancel.bind(this);
        this.noDataComponent=this.noDataComponent.bind(this);
        this.addWorkshopServices=this.addWorkshopServices.bind(this);
    }
    componentWillMount() {
        this.props.getCarServices();
        this.props.getWorkshopServices();
    }
    renderSectionFooter() {
            return (<View style={{height:100}}/>);
        }
    noDataComponent(){
        return(<View style={styles.messageView}>
                <Text style={styles.messageText}>{"No services registered"}</Text>
            </View>
            )
    }
    onCancel(){
        this.setState({
            isServicesVisible: false
        })
    }
    onSelected(selectedList){
        this.setState({
            selectedServices:[...selectedList],
            isServicesVisible:false
        })
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
                workshopServices:nextProps.workshopServices,
                isRefreshing: false
            });
            this.props.getWorkshopServices();

        }
    }
    renderItem(data) {
        let { item, index } = data;
        return (
            <Row
                data={item}
            />
        )
    }
    onServiceSelect() {
        this.setState({
            isServicesVisible: true
        })
    }
    addWorkshopServices(){
        let serviceIds=[];
        let i=0;
        for(;i<this.state.selectedServices.length;i++){
            let id=parseInt(this.state.selectedServices[i].value);
            serviceIds.push(id);
        }
        this.props.addWorkshopServices(serviceIds);
    }

    render() {
        return (<PageTemplate
            title={"Car Services"}
            navigation={this.props.navigation}
        >
            {this.props.isLoaded ?
                (<FlatList
                    onRefresh={this.onPullToRefreshList}
                    refreshing={this.state.isRefreshing}
                    style={styles.ListViewStyles}
                    data={this.state.workshopServices}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.noDataComponent}
                    ListFooterComponent={this.renderSectionFooter}
                />) :
                 (<View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"large"} color={colors.blue} /></View>)}
            <TouchableOpacity style={styles.plusIcon} onPress={() => { this.onServiceSelect() }}>
                <Icon
                    size={30}
                    color={colors.white}
                    name={"plus"} />
            </TouchableOpacity>
            {this.state.selectedServices.length>0?(<TouchableOpacity style={styles.workshopServicesButton} onPress={this.addWorkshopServices}>
                <Text style={styles.registerText} >{"Add Services ("+this.state.selectedServices.length+")"}</Text>
            </TouchableOpacity>):null}
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
        error: state.WorkshopServicesReducer.error,
        isLoaded: state.WorkshopServicesReducer.isLoaded,
        workshopServices: state.WorkshopServicesReducer.services
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarServices);