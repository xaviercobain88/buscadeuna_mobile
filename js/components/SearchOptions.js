/**
 * Created by xavier on 8/8/16.
 */
import React, {Component, PropTypes} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    TextInput,
    Modal,
    ScrollView,
    Dimensions
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import {NEW_ARRIVALS, ON_SALE} from '../filter/Constants';
let {height, width} = Dimensions.get('window');
export default class SearchOptions extends React.Component {
    constructor(props) {
        super(props);
        // this._onPressCategory0 = this._onPressCategory0.bind(this)

    }


    _getProductTypes() {
        return this.props.categories.map(category => {
            return <TouchableWithoutFeedback key={category.name}
                                             onPress={()=>this.props.onCategorySelected(category.name)}>
                <View style={styles.categoryWrapper}>
                    <View
                        style={[styles.categoryIconCircle, {backgroundColor: category.color}]}>
                        <Text style={styles.categoryIcon}>{category.icon}</Text>
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                </View></TouchableWithoutFeedback>
        })
    }

    _getTopSearches() {
        return this.props.topSearches.map(topSearch => {
            return <TouchableOpacity style={styles.topSearch} key={topSearch.id}>
                <Text style={styles.topSearchText}>{topSearch.ots}</Text>
                {!topSearch.filter ? <Text /> : <Text style={styles.topSearchFilterText}>en {topSearch.filter}</Text>}
            </TouchableOpacity>
        })
    }



    render() {
        return <View style={styles.container}>

            <Text style={styles.contentCategoryHeader}>BUSCAR POR CATEGORÍA:</Text>

            <View style={styles.categoryContainer}>{this._getProductTypes()}</View>

            <Text style={styles.contentCategoryHeader}>LO MÁS BUSCADO:</Text>

            <View style={styles.topSearchContainer}>{this._getTopSearches()}</View>


        </View>
    }
}

SearchOptions.propTypes = {
    categories: PropTypes.array.isRequired,
    topSearches: PropTypes.array.isRequired,
    onCategorySelected: PropTypes.func.isRequired


};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentCategoryHeader: {
        paddingTop: 20,
        fontFamily: 'Roboto-Medium',
        color: '#999',
        fontSize: 11
    },
    categoryIcon: {

        fontFamily: 'icons',
        color: "#fff",
        fontSize: 30

    },
    categoryIconCircle: {
        width: 54,
        height: 54,
        borderRadius: 54 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryContainer: {
        flexDirection: 'row'
    },
    categoryWrapper: {
        paddingVertical: 20,
        paddingBottom: 12,
        paddingHorizontal: 11,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    categoryName: {
        fontFamily: 'Raleway-Regular',
        fontSize: 15,
        marginTop: 5,
        color: '#222'
    },
    topSearchContainer: {
        paddingTop: 10,
        flexDirection: 'column'
    },
    topSearch: {
        flexDirection: 'row',
        paddingVertical: 12,
        justifyContent: 'center'
    },
    topSearchFilterText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 15,
        marginLeft: 4,
        color: '#999'
    },
    topSearchText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        color: '#222'
    },
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
    modalInner2: {
        borderRadius: 5,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        paddingVertical: 15,
    },
    contentContainerModalInner: {
        alignItems: 'center',
    },
    categories2ScrollView: {
        maxHeight: height - 180,
        alignSelf: 'stretch',
    },
    categories1: {
        fontFamily: 'Raleway-Regular',
        fontSize: 20,
        marginVertical: 9,
        height: 22,
    },
    categories2: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        marginVertical: 9,
        flex: 1,
        alignSelf: 'center'
    }
})