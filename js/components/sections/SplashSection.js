/**
 * Created by xavier on 5/10/16.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
    StatusBar,
    Animated,
    ScrollView
} from 'react-native'

class SplashSection extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {showSearch: false};
    }

    componentWillMount() {
        this.props.init()
    }


    render() {
        return <View style={styles.container}>

            <Text>Cargando en el splash screen</Text>
        </View>
    }


}


SplashSection.propTypes = {
    init: PropTypes.func.isRequired,
    
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SplashSection