import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,StyleSheet } from "react-native";
import {width,height} from "react-native-dimension";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";
import { PageTemplate } from "../../../common";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ReduxActions from "../../../../actions";
const styles = StyleSheet.create({
    
    Receipt: {
        color: '#47525E',
        fontSize:100,
        alignItems:'center',
    }
  });
class AppointmentDetails extends Component {
constructor(props) {
        super(props);
        // const {state} = this.props.navigation;
        // var name = state.params ? state.params.appointmentID : "<undefined>";
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
        const {state} = this.props.navigation;
        var iApptid = state.params ? state.params.appointmentID : "<undefined>";
        const url = "http://callgenie.000webhostapp.com/CallGenie/CallGenie/index.php/COwner/getAppointmentDetails?iApptid="+iApptid;
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
  render() {
    const {state} = this.props.navigation;
    var TotalAmount = state.params ? state.params.Amount : "<undefined>";
    var DistanceCharges = state.params ? state.params.DistanceCharges : "<undefined>";
    return (
        
        <PageTemplate
        title={"Appointment Detail"}
        iconName={"chevron-left"}
        onLeftButtonPress={this.goBack}
        >
        <View style={styles.Receipt}>
            <Text>Receipt</Text>
        </View>
        <View style={styles.Receipt}>
            <Text style={{color:"Grey",fontSize:17}} numberOfLines={2}>
            
            {`${"Ride Charges                                        Rs. "}  ${DistanceCharges}`}
            </Text>
            
        </View>
        <View style={styles.Receipt}>
            <Text style={{color:"Black",fontSize:17}} numberOfLines={2}>
            
            {"Per KiloMeter Charges                               Rs. 20"}  
            </Text>
            
        </View>
        <View style={styles.Receipt}>
            <Text style={{color:"Grey",fontSize:17}} numberOfLines={2}>
            
            {`${"Service Charges                                     Rs. "}  ${TotalAmount}`}
            </Text>
            
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.ServiceName}
              
              containerStyle={{ borderBottomWidth: 0 }}
              rightTitle={item.TotalAmount}
              
            />
          )}
         
          
        />
       
      </PageTemplate>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        data:state.RegisterReducer.isRegisterSuccessfully,
        error:state.RegisterReducer.error
    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);
