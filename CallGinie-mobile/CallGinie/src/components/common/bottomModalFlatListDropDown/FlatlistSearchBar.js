import React, { Component } from 'react';
import styles from "./Styles";
import {SearchBar} from 'react-native-elements';

export default class FlatListSearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            isFocused: false,
            searchQuery: '',
            isLoading: false,
        }
        this.onClearText=this.onClearText.bind(this);
        this.onChangeText=this.onChangeText.bind(this);
    }
     
 
    onChangeText(text){
        this.props.onSearchSubmit(text);
    }
   
    onClearText(){
        this.setState({searchQuery: ''}, () => {
            this.props.onSearchSubmit(this.state.searchQuery);
        });        
    }
   
    render(){
        return(
            <SearchBar
                round
                platform="ios"
                lightTheme
                cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                placeholder='Search'
                autoCapitalize={false}
                inputStyle={styles.inputSearchStyle}
                onChangeText={this.onChangeText}
                onClearText={this.onClearText}
                />
        );
    }
}



