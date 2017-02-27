/**
 * Created by Dennis on 11/5/16.
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
import {
    Actions
} from 'react-native-router-flux';
let {height, width} = Dimensions.get('window');


export default class OptionModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let withParentRender = <View style={ styles.modalInner2}>
            <Text style={styles.categories1}>{this.props.parent}</Text>
            <ScrollView keyboardShouldPersistTaps={true} style={styles.categories2ScrollView}>

                {this.props.items.map(item => {
                    return <TouchableOpacity key={item.name} onPress={item.onPress}>
                        <Text style={[styles.categories2, {color: item.color}]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>;

        let withoutParentRender = <View style={styles.modalInner}>

            {this.props.items.map(item => {

                return <TouchableOpacity key={item.name} onPress={item.onPress}>
                    <Text style={[styles.item, {color: item.color}]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>

            })}
        </View>;

        return <Modal visible={this.props.isVisible} transparent={true} animationType='fade'>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={this.props.onTouchOut}>


                <View style={styles.modalBackground}>
                    {this.props.parent ? withParentRender : withoutParentRender}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    }
}

OptionModal.propTypes = {
    items: PropTypes.array.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onTouchOut: PropTypes.func.isRequired,
    parent: PropTypes.string,
};
const styles = StyleSheet.create({
        modalBackground: {
            padding: 35,
            paddingBottom: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalInner: {
            borderRadius: 5,
            alignItems: 'center',
            backgroundColor: '#fff',
            alignSelf: 'stretch',
            paddingVertical: 15
        },
        item: {
            fontFamily: 'Raleway-Regular',
            fontSize: 20,
            marginVertical: 9,
        },
        modalInner2: {
            borderRadius: 5,
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
            alignSelf: 'stretch',
            paddingVertical: 15,
        },
        categories1: {
            fontFamily: 'Raleway-Regular',
            fontSize: 20,
            marginVertical: 9,
            height: 22,
        },
        categories2ScrollView: {
            maxHeight: height - 180,
            alignSelf: 'stretch',
        },
        categories2: {
            fontFamily: 'Raleway-Regular',
            fontSize: 16,
            marginVertical: 9,
            flex: 1,
            alignSelf: 'center'
        }
    })
    ;
