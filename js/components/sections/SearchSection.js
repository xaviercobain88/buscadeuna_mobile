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
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'
import SearchingHeaderBar from '../SearchingHeaderBar'
import FilterControl from '../FilterControl'
import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';
import Spinner from 'react-native-loading-spinner-overlay';
import Minicard from '../Minicard';
let {height} = Dimensions.get('window');


class SearchSection extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    _getProducts() {
        return <ScrollView style={{height: height-129}}>
            
                <View style={styles.images}>
                    {this.props.products.map(product=><Minicard
                        key={product.id}
                        imageUrl={product.imageUrl}
                        brand={product.brand}
                        productName={product.productName}
                        price={product.price}
                        compareAtPrice={product.compareAtPrice}
                    />)}
                </View>
        </ScrollView>
    }

    _getSuggestedBrands() {

    }

    _getSuggestedCategories() {

    }

    _getFirstPart(name, fts) {
        return name.substr(0, name.toLowerCase().indexOf(fts.toLowerCase()));
    }

    _getLastPart(name, fts, next1, next2, category) {

        let complement = "";
        if (category) {
            if (name == next1) {
                complement = " en " + category;
            } else if (name == next2) {
                complement = ", " + next1 + " en " + category;
            } else {
                complement = ", " + next1 + ", " + next2 + " en " + category;
            }
        }


        return name.substr(name.toLowerCase().indexOf(fts.toLowerCase()) +
                fts.length, name.length) + complement;
    }

    _getHighlightedFts(firstPartString, fts) {
        return firstPartString ? fts.toLowerCase() : fts.charAt(0).toUpperCase() + fts.slice(1).toLowerCase()
    }


    render() {
        return <View style={styles.container}>

            <SearchingHeaderBar category0={this.props.category0} categories={this.props.categories}
                                onFtsChangeText={this.props.onFtsChangeText}
                                showFts={this.props.showFts} onShowFts={this.props.onShowFts}
                                onHideFts={this.props.showSuggestions?this.props.onHideSuggestions:this.props.onHideFts}/>

            {this.props.showSuggestions ?
                <ScrollView style={{paddingTop: 5}} keyboardShouldPersistTaps={true}>
                    <TouchableOpacity onPress={()=>this.props.onSuggestionPress(
                                                 null, null, null, null, null, this.props.ftsForSuggestions)}>
                        <View ><View style={styles.suggestionItemWrapper}>
                            <Text style={styles.searchIcon}>s</Text>
                            <Text style={styles.suggestionBoldText}>
                                {this.props.ftsForSuggestions}</Text>
                        </View></View>
                    </TouchableOpacity>
                    {this.props.suggestedCategories.map(suggestedCategory=> {
                        let firstPartString = this._getFirstPart(suggestedCategory.name, this.props.ftsForSuggestions);
                        let lastPartString = this._getLastPart(suggestedCategory.name, this.props.ftsForSuggestions,
                            suggestedCategory.category1, suggestedCategory.category2,
                            suggestedCategory.category0);
                        return <TouchableOpacity key={firstPartString+lastPartString}
                                                 onPress={()=>this.props.onSuggestionPress(
                                                 suggestedCategory.category0,
                                                 suggestedCategory.category1,
                                                 suggestedCategory.category2,
                                                 suggestedCategory.category3)}>
                            <View ><View style={styles.suggestionItemWrapper}>
                                <Text style={styles.searchIcon}>s</Text>
                                <Text style={styles.suggestionText}>{firstPartString}</Text>
                                <Text style={styles.suggestionBoldText}>
                                    {this._getHighlightedFts(firstPartString, this.props.ftsForSuggestions)}</Text>
                                <Text style={styles.suggestionText}>{lastPartString}</Text>
                            </View></View>
                        </TouchableOpacity>
                    })}
                    {this.props.suggestedBrands.map(suggestedBrand=> {
                        let firstPartString = this._getFirstPart(suggestedBrand.name, this.props.ftsForSuggestions);
                        let lastPartString = this._getLastPart(suggestedBrand.name, this.props.ftsForSuggestions);
                        return <TouchableOpacity key={suggestedBrand.name}
                                                 onPress={()=>this.props.onSuggestionPress(
                                                 null,
                                                 null,
                                                 null,
                                                 null, suggestedBrand.name)}>
                            <View ><View style={styles.suggestionItemWrapper}>
                                <Image source={{uri: suggestedBrand.imageUrl}} style={{
                height: 25, width: 25, alignSelf: 'stretch', marginRight: 12}}/>
                                <Text style={styles.suggestionText}>{firstPartString}</Text>
                                <Text style={styles.suggestionBoldText}>
                                    {this._getHighlightedFts(firstPartString, this.props.ftsForSuggestions)}</Text>
                                <Text style={styles.suggestionText}>{lastPartString}</Text>

                            </View></View>
                        </TouchableOpacity>
                    })}


                </ScrollView> :
                <View>
                    <FilterControl category={this.props.category}
                                   price={this.props.price}
                                   brands={this.props.brands}
                                   isOrdered={this.props.isOrdered}
                                   onBrandPress={this.props.onBrandPress}
                                   onPricePress={this.props.onPricePress}
                                   onCategoryPress={this.props.onCategoryPress}
                                   onOrderByPress={this.props.onOrderByPress}/>
                    {this._getProducts()}
                </View>
            }
            < Spinner visible={this.props.isLoading}/>


        </View>
    }


}


SearchSection.propTypes = {
    category0: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    brands: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    onBrandPress: PropTypes.func.isRequired,
    onPricePress: PropTypes.func.isRequired,
    onCategoryPress: PropTypes.func.isRequired,
    onOrderByPress: PropTypes.func.isRequired,
    isOrdered: PropTypes.bool.isRequired,
    showFts: PropTypes.bool.isRequired,
    onShowFts: PropTypes.func.isRequired,
    onHideFts: PropTypes.func.isRequired,
    onFtsChangeText: PropTypes.func.isRequired,
    showSuggestions: PropTypes.bool.isRequired,
    suggestedBrands: PropTypes.array.isRequired,
    suggestedCategories: PropTypes.array.isRequired,
    onHideSuggestions: PropTypes.func.isRequired,
    ftsForSuggestions: PropTypes.string,
    onSuggestionPress: PropTypes.func.isRequired,

};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'

    },
    images: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignItems: 'flex-start',

    },
    suggestionText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 15,
        color: '#777'
    },
    suggestionBoldText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 15,
    },
    suggestionItemWrapper: {
        paddingVertical: 12,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    searchIcon: {
        fontFamily: 'icons',
        fontSize: 14,
        color: '#777',
        marginRight: 10
    }
});

export default SearchSection