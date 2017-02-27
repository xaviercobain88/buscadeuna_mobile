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
const DEFAULT_CATEGORY = "Todas";
const DEFAULT_BRAND = "Todas";
const DEFAULT_PRICE = "Todo";


export default class FilterControl extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let category = this.props.category ? this.props.category : DEFAULT_CATEGORY;
        let brands = this.props.brands ? this.props.brands : DEFAULT_BRAND;
        let price = this.props.price ? this.props.price : DEFAULT_PRICE;

        return <View style={styles.container}>
            <TouchableOpacity onPress={this.props.onOrderByPress} style={styles.orderBy}>
                <Text style={[styles.orderByText, {color: this.props.isOrdered?'#2c6bf4':'#000'}]}>o</Text>
            </TouchableOpacity>
            <View style={styles.filters}>
                <TouchableOpacity onPress={this.props.onCategoryPress} style={styles.filterWrapper}>
                    <Text style={styles.filterLabel}>CATEGORÍA</Text>
                    <View style={styles.filterSelector}>
                        <Text
                            style={[styles.selectedFilter, {color: category==DEFAULT_CATEGORY?  '#000':'#2c6bf4'}] }>{category}</Text>
                        <Text style={styles.selectFilterIcon}>e</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPricePress} style={styles.filterWrapper}>
                    <Text style={styles.filterLabel}>PRECIO</Text>
                    <View style={styles.filterSelector}>
                        <Text
                            style={[styles.selectedFilter, {color: price==DEFAULT_PRICE?  '#000':'#2c6bf4'}] }>{price}</Text>
                        <Text style={styles.selectFilterIcon}>e</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onBrandPress} style={styles.filterWrapper}>
                    <Text style={styles.filterLabel}>MARCAS</Text>
                    <View style={styles.filterSelector}>
                        <Text
                            style={[styles.selectedFilter, {color: brands==DEFAULT_BRAND?  '#000':'#2c6bf4'}] }>{brands}</Text>
                        <Text style={styles.selectFilterIcon}>e</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </View>

    }
}

FilterControl.propTypes = {
    category: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    brands: PropTypes.string.isRequired,
    onBrandPress: PropTypes.func.isRequired,
    onPricePress: PropTypes.func.isRequired,
    onCategoryPress: PropTypes.func.isRequired,
    onOrderByPress: PropTypes.func.isRequired,
    isOrdered: PropTypes.bool.isRequired

};
const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: '#ddd',
            justifyContent: 'flex-start',

        },
        orderByText: {
            fontFamily: 'icons',
            fontSize: 16,
            color: '#222',


        },
        orderBy: {
            borderRightWidth: 0.5,
            borderRightColor: '#ddd',
            paddingHorizontal: 8,
            justifyContent: 'center',
            paddingVertical: 10

        },
        filters: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'stretch'

        },
        filterLabel: {
            fontFamily: 'Raleway-Regular',
            fontSize: 11,
            color: '#777',
            alignSelf: 'flex-start'

        },
        filterWrapper: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 9,
            flex: 1,
            borderRightWidth: 0.5,
            borderRightColor: '#ddd',
        },
        selectedFilter: {
            fontFamily: 'Raleway-SemiBold',
            color: '#333',
            fontSize: 13,

        },
        selectFilterIcon: {
            fontFamily: 'icons',
            color: '#000',
            fontSize: 7,
            marginHorizontal: 6
        },
        filterSelector: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 2
        }


    })
    ;
