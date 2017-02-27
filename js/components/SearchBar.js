/**
 * Created by Dennis on 11/5/16.
 */

import React, {Component, PropTypes} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
var DismissKeyboard = require('dismissKeyboard');

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    getLogo() {
        if (this.props.isSearchingFocused)
            return <TouchableOpacity onPress={()=>{
            DismissKeyboard();
            this.props.onBackButton()
            }}><Text
                style={styles.backIcon}>b</Text></TouchableOpacity>;
        else
            return <Text style={styles.logo}>l</Text>;
    }

    render() {
        return <View style={styles.container}>
            {this.getLogo()}
            <View style={styles.searchContainer}>
                <View style={styles.inputTextContainer}>
                    <Text style={styles.searchIcon}>s</Text>
                    <TextInput style={styles.searchInputText}
                               placeholder={"Busca lo que quieras"}
                               placeholderTextColor="#999" onFocus={this.props.onFocusOnSearch}
                    />
                </View>
                <View style={styles.separator}/>
            </View>
        </View>

    }
}

SearchBar.propTypes = {
    onFocusOnSearch: PropTypes.func.isRequired,
    isSearchingFocused: PropTypes.bool.isRequired,
    onBackButton: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    
        container: {
            flexDirection: 'row',
            shadowColor: "black",
            shadowOpacity: 30,
            paddingTop: 34,
            paddingBottom: 18,
            alignItems: 'center',
        },

        logo: {
            fontFamily: 'icons',
            fontSize: 28,
            marginLeft: 20,
        },
        backIcon: {
            fontFamily: 'icons',
            fontSize: 22,
            marginLeft: 20,
        },
        searchContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingHorizontal: 20
        },

        separator: {
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#e7e7e7',
        },
        inputTextContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            height: 31

        },
        searchIcon: {
            fontFamily: 'icons',
            fontSize: 16,
            color: '#999',
            marginTop: 2,
            marginRight: 12
        },
        searchInputText: {
            fontSize: 18,
            flex: 1,
            fontFamily: 'Raleway-Regular',
        }
    })
    ;
