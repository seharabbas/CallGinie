import React, { Component } from 'react';
import {
  FlatList
} from 'react-native';
import { styles } from "./Styles";
import { PageTemplate } from "../../common";
import { width, height } from "react-native-dimension";
import { DropDownHolder } from '../../common/DropDownHolder';
import Row from "./Row";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";

class CarServices extends Component {
    constructor(props){
        super(props);
        this.state={
            carServices:[],
            isRefreshing:false
        }
        this.onPullToRefreshList=this.onPullToRefreshList.bind(this);
    }
    componentWillMount(){
        this.props.getCarServices();
    }
    onPullToRefreshList(){
        this.props.getCarServices();
        this.setState({
            isRefreshing:true
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.props.services!=nextProps.services){
            this.setState({
                carServices:services,
                isRefreshing:false
            })
        }
    }
    renderItem(data){
        let { item, index } = data;
        return (
            <Row 
             data={item} 
            />
        )
    }

    render(){
        return(
            <PageTemplate>
               <FlatList
                onRefresh={this.onPullToRefreshList}
                refreshing={this.state.isRefreshing}
                style={styles.ListViewStyles}
                data={this.state.carServices}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}
                ListEmptyComponent={this.noDataComponent}
                ListFooterComponent={this.renderSectionFooter}
              />   
            </PageTemplate>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        services:state.RegisterReducer.isRegisterSuccessfully,
        error:state.RegisterReducer.error
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarServices);