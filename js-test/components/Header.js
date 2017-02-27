/**
 * Created by Dennis on 2/5/16.
 */

import React, {
    Component,
    StyleSheet,
    Image,
    Platform,
    Animated,
    ListView,
    View,
    Text,
    PropTypes
} from 'react-native';


const Header = ({title}) => (
            <View style={styles.searchContainer}>
                <Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require('../images/latam_inverse.png')}>
                    <Text style={styles.title}>{title}</Text>
                </Image>
            </View>
        );

Header.propTypes = {
    title: PropTypes.string.isRequired
};


var styles = StyleSheet.create({
    image: {
        width: 220,
        height: 100
    },
    searchContainer: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        color: '#b3b3b3',
        position: 'absolute',
        top: 65,
        width: 220,
        textAlign: 'center',
        fontWeight: '100',
        fontSize: 11
    }
});

export default Header