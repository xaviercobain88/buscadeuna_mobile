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

let {width} = Dimensions.get('window');

export default class Minicard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <TouchableOpacity><View style={styles.container}>
            <Image source={{uri: this.props.imageUrl}} style={styles.image} resizeMode='contain'/>
            <Text style={styles.brand}>{this.props.brand}</Text>
            <Text style={styles.productName}>{this.props.productName}</Text>
            <View style={styles.priceWrapper}>
                {this.props.compareAtPrice ? <Text style={styles.compareAtPrice}>${this.props.compareAtPrice}</Text> :
                    <Text />}
                <Text style={[styles.price, {
                color: this.props.compareAtPrice ? '#fc582f' :'#777'
                }]}>${this.props.price}</Text>

            </View>
        </View></TouchableOpacity>
    }
}
Minicard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    compareAtPrice: PropTypes.string.isRequired
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        height: (width / 2) + 45,
        width: (width / 2) - 10,
    },
    image: {
        alignSelf: 'stretch',
        height: (width / 2) - 24,
        marginBottom: 8

    },
    brand: {
        fontFamily: 'Raleway-SemiBold',

    },
    productName: {
        fontFamily: 'Raleway-Regular',

    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        fontFamily: 'Roboto-Light',
        color: '#fc582f'

    },
    compareAtPrice: {
        fontFamily: 'Roboto-Light',
        marginRight: 3,
        fontSize: 11,
        textDecorationLine: 'line-through',
        color: '#777'
    },
});