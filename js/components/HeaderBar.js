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
import OptionModal from '../components/OptionModal'


export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.container}>
            <View style={{flexDirection: 'row'}}><TouchableOpacity onPress={this.props.onBackPress}><Text
                style={styles.backIcon}>b</Text></TouchableOpacity>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>{this.props.header.toUpperCase()}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={this.props.onRightOptionPress}
                              style={{flexDirection: 'column', justifyContent: 'center', paddingHorizontal:20}}>
                <Text style={{color:'#999',
                fontFamily: 'Raleway-SemiBold',
                fontSize: 13}}>{this.props.rightOption?this.props.rightOption.toUpperCase():""}</Text>
            </TouchableOpacity>
        </View>

    }
}

HeaderBar.propTypes = {
    onBackPress: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    rightOption: PropTypes.string,
    onRightOptionPress: PropTypes.func,

};
const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            shadowColor: "black",
            shadowOpacity: 30,
            paddingTop: 34,
            paddingBottom: 18,
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        backIcon: {
            fontFamily: 'icons',
            fontSize: 22,
            marginLeft: 20,
        },

        headerWrapper: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },

        header: {
            fontSize: 18,
            color: '#222',
            fontFamily: 'Raleway-Regular',
        },

        chevron: {
            fontFamily: 'icons',
            fontSize: 18,
            color: '#222',
            marginLeft: 12
        }


    })
    ;
