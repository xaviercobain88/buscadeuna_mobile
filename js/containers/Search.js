import {connect} from 'react-redux'
import SearchSection from '../components/sections/SearchSection'
import {Actions} from 'react-native-router-flux';
import {
    GoRefineCmd, GoOrderByModalCmd, ShowFtsBoxCmd, HideFtsBoxCmd,
    FtsChangeTextCmd
} from '../app/Commands'
import {BRAND, CATEGORY, PRICE, ORDER_BY} from '../app/Constants'
import {HideSuggestionsEvt} from '../filter/Events'
import {CategorySearchCmd} from '../filter/Commands'
import {
    RELEVANCE, NEWEST, POPULAR, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH
} from '../app/Constants'

const mapStateToProps = (state) => {


    let category0 = state.search.category0;
    let category1 = state.search.category1;
    let category2 = state.search.category2;
    let category3 = state.search.category3;
    let category = "";
    if (category0) {
        category = category0
    }
    if (category1) {
        category = category1
    }
    if (category2) {
        category = category2
    }
    if (category3) {
        category = category3
    }
    let price = '';
    let brands = '';

    if (state.search.priceFrom && state.search.priceTo) {
        price = '$' + state.search.priceFrom + " - $" + state.search.priceTo;
    } else if (state.search.priceFrom) {
        price = '> $' + state.search.priceFrom;
    } else if (state.search.priceTo) {
        price = '< $' + state.search.priceTo;
    }

    if (state.search.brands) {
        if (state.search.brands.length == 1)
            brands = state.search.brands[0];
        if (state.search.brands.length > 1)
            brands = "(" + state.search.brands.length + ")";
    }


    return {
        category: category,
        category0: category0,
        price,
        brands,
        isOrdered: state.search.orderBy == POPULAR
        || state.search.orderBy == NEWEST
        || state.search.orderBy == PRICE_HIGH_TO_LOW
        || state.search.orderBy == PRICE_LOW_TO_HIGH,
        categories: state.filters.categories,
        isLoading: !state.search.completed,
        showFts: state.search.fts || state.search.showFts ? true : false,
        showSuggestions: state.filters.showSuggestions ? true : false,
        suggestedBrands: state.filters.suggestedBrands,
        suggestedCategories: state.filters.suggestedCategories,
        ftsForSuggestions: state.filters.ftsForSuggestions,
        products: state.products.map(product => {
            return {
                id: product.id,
                imageUrl: product.images[0],
                brand: product.brand,
                productName: product.name,
                price: product.variants[0]["price"],
                compareAtPrice: product.variants[0]["compareAtPrice"],

            }
        })


    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        onBrandPress: ()=>dispatch(new GoRefineCmd(BRAND).toPlainJSON()),
        onCategoryPress: ()=>dispatch(new GoRefineCmd(CATEGORY).toPlainJSON()),
        onPricePress: ()=>dispatch(new GoRefineCmd(PRICE).toPlainJSON()),
        onOrderByPress: ()=>dispatch(new GoOrderByModalCmd().toPlainJSON()),
        onShowFts: ()=>dispatch(new ShowFtsBoxCmd().toPlainJSON()),
        onHideFts: ()=>dispatch(new HideFtsBoxCmd().toPlainJSON()),
        onHideSuggestions: ()=>dispatch(new HideSuggestionsEvt().toPlainJSON()),
        onFtsChangeText: (text)=>dispatch(new FtsChangeTextCmd(text).toPlainJSON()),
        onChangeCategoryFromHeader: (category)=>dispatch(new CategorySearchCmd(category).toPlainJSON()),
        onSuggestionPress: (category0, category1, category2, category3, brand, fts)=> {

            dispatch(new CategorySearchCmd(category0, category1, category2, category3, [brand]).toPlainJSON())
        }

    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps, ...dispatchProps,
        categories: stateProps.categories.map(category=> {
            return {
                ...category,
                color: '#222',
                onPress: ()=>dispatchProps.onChangeCategoryFromHeader(category.name)
            }
        })

    }
};

const Search = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(SearchSection);

export default Search