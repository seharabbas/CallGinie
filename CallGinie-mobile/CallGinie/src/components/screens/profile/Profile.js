import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Text,
    ActivityIndicator
} from 'react-native';
import { styles } from "./Styles";
import { PageTemplate } from "../../common";
import { width, height } from "react-native-dimension";
import { DropDownHolder } from '../../common/DropDownHolder';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../actions";

const placeholder = require('../../../assets/placeholder.png');


class Registration extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        const { params } = this.props.navigation.state;

    }
    goBack() {
        this.props.navigation.goBack();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.isRegisterSuccessfully!=nextProps.isRegisterSuccessfully){
            this.setState({
                isSigningUp:false
            });
        }
    }
  
    render() {
        return (
            <PageTemplate
                title={"Book A Ride"}
                navigation={this.props.navigation}
            >
        
            </PageTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        isRegisterSuccessfully:state.RegisterReducer.isRegisterSuccessfully,
        error:state.RegisterReducer.error
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);