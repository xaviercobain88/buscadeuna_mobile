/**
 * Created by xavier on 8/25/16.
 */
import React, {Component, PropTypes} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Modal,
    TextInput,
    Dimensions,
    ScrollView
} from 'react-native';


let search = 'search';
let favorites = 'favorites';
let chats = 'chats';
let profile = 'profile';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <View style={styles.container}>
            <TouchableOpacity style={styles.touchableWrapper}>
                <Text style={[styles.tab, this.props.selectedTab==search?{color:'#000'}:{}]}>s</Text></TouchableOpacity>
            <TouchableOpacity style={styles.touchableWrapper}>
                <Text
                    style={[styles.tab, this.props.selectedTab==favorites?{color:'#000'}:{}]}>i</Text></TouchableOpacity>
            <TouchableOpacity style={styles.touchableWrapper}>
                <Text style={[styles.tab, this.props.selectedTab==chats?{color:'#000'}:{}]}>m</Text></TouchableOpacity>
            <TouchableOpacity style={styles.touchableWrapper}>
                <Text
                    style={[styles.tab, this.props.selectedTab==profile?{color:'#000'}:{}]}>p</Text></TouchableOpacity>
        </View>
    }
}


TabBar.propTypes = {
    selectedTab: PropTypes.oneOf([search, favorites, chats, profile]).isRequired,
    onSearch: PropTypes.func.isRequired,
    onFavorites: PropTypes.func.isRequired,
    onChats: PropTypes.func.isRequired,
    onProfile: PropTypes.func.isRequired
};
const styles = StyleSheet.create({
    container: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        borderTopColor: '#d5d5d5',
        borderTopWidth: 0.5
    },
    touchableWrapper: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    tab: {
        fontSize: 23,
        fontFamily: 'icons',
        color: '#bbb'
    }
});