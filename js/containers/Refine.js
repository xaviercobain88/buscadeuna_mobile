import {connect} from 'react-redux'
import RefineSection from '../components/sections/RefineSection'
import {Actions} from 'react-native-router-flux';
import {GoSearchCmd} from '../app/Commands';
import {CategorySearchCmd} from '../filter/Commands';
import {CATEGORY, PRICE, BRAND,} from '../app/Constants'
import {ON_SALE} from '../filter/Constants'

const mapStateToProps = (state) => {
    return {
        onSaleLabel: ON_SALE,
        selectedCategory0: state.search.category0,
        selectedCategory1: state.search.category1,
        selectedCategory2: state.search.category2,
        selectedCategory3: state.search.category3,
        selectedFilterType: state.search.section ? state.search.section : CATEGORY,
        selectedPriceFrom: state.search.priceFrom,
        selectedPriceTo: state.search.priceTo,
        selectedBrands: state.search.brands,
        selectedOnSale: state.search.onSale ? true : false,
        categories: state.filters.categories,
        brands: state.filters.brands,
        minPrice: 0,
        maxPrice: 10000,

    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        onBackPress: ()=>Actions.pop(),//133600 1530000
        onShowResultsPress: (category0:String,
                             category1:String,
                             category2:String,
                             category3:String,
                             brands:Array<String>,
                             priceFrom:Number,
                             priceTo:Number,
                             fts:String)=>()=>dispatch(
            new CategorySearchCmd(category0, category1, category2, category3, brands, priceFrom, priceTo,
                null, null, null, null, null, null, true)
                .toPlainJSON())
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {

};

const Refine = connect(
    mapStateToProps,
    mapDispatchToProps
)(RefineSection);

export default Refine