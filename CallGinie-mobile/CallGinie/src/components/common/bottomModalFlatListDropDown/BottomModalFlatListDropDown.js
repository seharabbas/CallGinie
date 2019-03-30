import React, { Component } from 'react';
import {Text, View ,TouchableOpacity,FlatList,Keyboard,Platform} from 'react-native';
import Modal from "react-native-modal";
import Row from "./Row";
import FlatListSearchBar from "./FlatlistSearchBar";
import styles from "./Styles";
import { height, width } from 'react-native-dimension';
import { colors } from '../../../config';

const noDataAvailable=(
  <View style={styles.emptyListContainer}>
        <Text  style={styles.emptyListText} >{"No Data Available"}</Text>
  </View>);
class BottomModalFlatListDropDown extends Component{
      
   constructor(props){
     super(props);
     this.state={
       data:this.props.data,
       selected:[]
     }
     this.onSearchSubmit=this.onSearchSubmit.bind(this);
     this.renderItem=this.renderItem.bind(this);
     this.onSelect=this.onSelect.bind(this);
     this.keyboardDidHide=this.keyboardDidHide.bind(this);
     this.keyboardDidShow=this.keyboardDidShow.bind(this);
     this.getModalHeight=this.getModalHeight.bind(this);
     this.getViewHeight=this.getViewHeight.bind(this);
     this.onSelectedPress=this.onSelectedPress.bind(this);
   }


    onSelect(data){
      let selectedList=[...this.state.selected]
      let index = selectedList.findIndex(o=>o.value==data.value);
      if(index>=0){
        selectedList.splice(index,1);
        this.setState({
          selected:selectedList
        });
      }
      else{
        selectedList.push(data);
        this.setState({
          selected:selectedList
        });
      }
    } 
    renderItem(data) {
      let { item, index, section } = data;
      let selectedIndex = this.state.selected.findIndex(o=>o.value==item.value);
      return ( 
      <Row 
          data={item}
          index={''+index}
          key = {'' + index}
          isSelected={selectedIndex>=0}
          onSelect={() => {this.onSelect(item)}}
      />);
     
    }
    componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardDidHide,
      );
    }
    componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
    keyboardDidShow() {
      if(!this.state.isKeyboardVisible)
        this.setState({
          isKeyboardVisible : true
        })
    }
  
    keyboardDidHide() {
      if(this.state.isKeyboardVisible)
        this.setState({
          isKeyboardVisible : false
        })
    }
    componentWillReceiveProps(nextProps){
      if(this.props.data!=nextProps.data){
           this.setState({
            data:nextProps.data
           })
      }
    }
    onSearchSubmit(searchText){
      let searchTerm=searchText.toLowerCase();
       let data=this.props.data;
       let filteredList=[];
       data.forEach(item => {
        if(item.label!=null && item.label.toLowerCase().indexOf(searchTerm)>=0){
          filteredList.push(item);
        }
       });
       
       this.setState({
        data: filteredList
       })
    }
    onCancel = (prop) => {
      this.setState({
        data: prop.data
      });
      prop.onCancel();
    }
    onSelectedPress(){
      this.props.onSelectedPress(this.state.selected);
    }

  getViewHeight() {
    return this.state.isKeyboardVisible ? Platform.OS == "ios" ? {height: height(80)} : {height: height(40)} : {};
  }
  getModalHeight() {
    return this.state.isKeyboardVisible ? Platform.OS == "ios" ? {height: height(70)} : {height:height(30)} : {};
  }
  render(){
    let viewHeightIfKeyboardIsVisible = this.getViewHeight()
    let modalHeightIfKeyboardIsVisible = this.getModalHeight()

    return(
    <Modal 
    isVisible={this.props.visible}
    style={[styles.bottomModal,modalHeightIfKeyboardIsVisible ]} 
    avoidKeyboard={false}
    >
      <View style={[styles.modalContent,viewHeightIfKeyboardIsVisible]}>
        <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => {this.onCancel(this.props)}}>
            <View>
              <Text style={[styles.cancelContent,{color:colors.red}]}>{"Cancel"}</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.addContent}>{this.props.placeholder}</Text>
          </View>
          <TouchableOpacity onPress={() => {this.onSelectedPress()}}>
            <View>
              <Text style={[styles.cancelContent,{marginRight:5}]}>{"Selected("+this.state.selected.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
      
        <View style={{flex:1}}>
          {this.props.isSearchBarVisible ? 
            <FlatListSearchBar onSearchSubmit={this.onSearchSubmit}/>:null
          }
          <FlatList
            data={this.state.data}
            extraData={this.state}
            style={styles.listView}
            keyExtractor={(item, index) =>  item.id}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent = {noDataAvailable}
            showsVerticalScrollIndicator={false}
          />
        </View>  
      </View>
    </Modal>);
  }
}







export {BottomModalFlatListDropDown};


