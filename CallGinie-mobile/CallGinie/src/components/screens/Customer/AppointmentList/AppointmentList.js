import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";
import { PageTemplate } from "../../../common";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../../actions";

class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.goToAppointmentDetails = this.goToAppointmentDetails.bind(this);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.navigation.goBack();
}
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    
    const url = "http://callgenie.000webhostapp.com/CallGenie/CallGenie/index.php/COwner/getCarOwnerAppointments?CarOwnerId="+this.props.customer.U_id+"&type="+this.props.userType;
    
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
  goToAppointmentDetails(iApptid)
  {
    this.props.navigation.navigate("CustomerAppointmentDetails", {
        iApptid: iApptid
    });
  }
  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
        <PageTemplate
        title={"Appointment List"}
        iconName={"chevron-left"}
        onLeftButtonPress={this.goBack}
        >
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.AppointmentDate}
              subtitle={item.AppointmentTime}
              key={item.iApptid}
              containerStyle={{ borderBottomWidth: 0 }}
              rightTitle={item.TotalAmount}
              onPress={() => this.props.navigation.navigate("CustomerAppointmentDetails",{appointmentID:item.iApptid,Amount:item.TotalAmount,TotalDistance:item.TotalDistance,DistanceCharges:item.DistanceCharges})}
            />
          )}
          keyExtractor={item => item.ServiceName}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          
        />
      </PageTemplate>
    );
  }
}
const mapStateToProps = (state) => {
  return {
     customer:state.AuthReducer.customer,
     userType:state.AuthReducer.userType
  }
};
function mapDispatchToProps(dispatch) {

  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FlatListDemo);
