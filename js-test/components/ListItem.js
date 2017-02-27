/**
 * Created by xavier on 4/26/16.
 */

import React, {
    View,
    Text,
    PropTypes,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Constants from '../project/Constants'
import LoadingBar from '../components/LoadingBar'

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wt: 0
        }
    }

    render() {
        return (
            <View style={styles.row} onLayout={
            (event) => {
                    this.setState({wt: event.nativeEvent.layout.width});
                    this.setState({ht: event.nativeEvent.layout.height});
                }
            }>
                <TouchableOpacity onPress={this.props.onClick} style={[this.props.completed && styles.active]}>
                    <Text numberOfLines={1}
                          style={[styles.text, this.props.status == Constants.SERVER_PENDING && styles.inactive, this.props.completed&&styles.completed]}>{this.props.name}</Text>
                </TouchableOpacity>
                <Image style={[styles.ac, this.props.completed && styles.acin]} resizeMode={Image.resizeMode.contain}
                       source={require('../images/ic_check.png')}/>
                <View style={[styles.bullet, this.props.completed && styles.activebl]}>
                    <TouchableOpacity style={styles.complete} onPress={this.props.onClick}/>
                </View>
                <View style={styles.delete}>
                    <TouchableOpacity style={styles.complete} onPress={this.props.onDelete}/>
                </View>
                {this.props.status == Constants.SERVER_PENDING ?
                    <LoadingBar wt={this.state.wt} ht={this.state.ht}/>
                    : null }
            </View>
        );
    }
}
Project.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    status: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};


var styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#66cac7',
        borderRadius: 5,
        opacity: .2
    },
    row: {
        position: 'relative',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 50,
        marginBottom: 5,
        marginLeft: 10,
        marginTop: 5,
        marginRight: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        height: 45,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    text: {
        color: '#202020',
    },
    bullet: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        right: 10,
        top: 12,
        borderWidth: 4,
        borderColor: '#e6e6e6'
    },
    active: {
        paddingLeft: 20
    },
    completed: {
        textDecorationLine: 'line-through'
    },
    activebl: {
        backgroundColor: '#66cac7'
    },
    ac: {
        width: 0,
        height: 20,
        position: 'absolute',
        left: 8,
        top: 12
    },
    acin: {
        width: 20
    },
    complete: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: -4,
        left: -4
    },
    delete: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        right: 40,
        top: 12,
        borderWidth: 4,
        borderColor: 'red'
    },
    inactive: {
        color: '#9f9f9f'
    }
});