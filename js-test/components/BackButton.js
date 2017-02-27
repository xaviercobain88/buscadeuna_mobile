/**
 * Created by Dennis on 11/5/16.
 */

import React, { Platform, Animated, PixelRatio, Image, StyleSheet, Text, TouchableOpacity, View, NavigationExperimental } from 'react-native';
import {
    Actions
} from 'react-native-router-flux';

export default class BackButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity testID="backNavButton" onPress={Actions.pop}>
               <Image style={styles.backButton} resizeMode={Image.resizeMode.contain} source={require('../images/ic_keyboard_arrow_left.png')} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 35,
        left: 15,
    }
});
