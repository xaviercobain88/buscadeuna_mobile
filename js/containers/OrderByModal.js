import {connect} from 'react-redux'
import OptionModal from '../components/OptionModal'
import {Actions} from 'react-native-router-flux';
import {
    RELEVANCE, POPULAR, NEWEST, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH,
    RELEVANCE_LBL, POPULAR_LBL, NEWEST_LBL, PRICE_HIGH_TO_LOW_LBL, PRICE_LOW_TO_HIGH_LBL
} from '../app/Constants'
import {CategorySearchCmd} from '../filter/Commands'


const mapStateToProps = (state) => {

    return {
        category0: state.search.category0,
        category1: state.search.category1,
        category2: state.search.category2,
        category3: state.search.category3,
        brands: state.search.brands,
        isVisible: true,
        priceFrom: state.search.priceFrom,
        priceTo: state.search.priceTo,
        fts: state.search.fts,
        newArrivals: state.search.newArrivals,
        onSale: state.search.onSale,
        items: [
            {
                name: RELEVANCE_LBL,
                color: state.search.orderBy == RELEVANCE ? '#3F72EA' : "#222",
                orderBy: RELEVANCE
            },
            {
                name: POPULAR_LBL,
                color: state.search.orderBy == POPULAR ? '#3F72EA' : "#222",
                orderBy: POPULAR
            },
            {
                name: NEWEST_LBL,
                color: state.search.orderBy == NEWEST ? '#3F72EA' : "#222",
                orderBy: NEWEST
            },
            {
                name: PRICE_HIGH_TO_LOW_LBL,
                color: state.search.orderBy == PRICE_HIGH_TO_LOW ? '#3F72EA' : "#222",
                orderBy: PRICE_HIGH_TO_LOW
            },
            {
                name: PRICE_LOW_TO_HIGH_LBL,
                color: state.search.orderBy == PRICE_LOW_TO_HIGH ? '#3F72EA' : "#222",
                orderBy: PRICE_LOW_TO_HIGH
            }],

    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        searchDispatcher: (category0, category1, category2, category3, brands, priceFrom, priceTo,
                           fts, newArrivals, onSale, orderBy)=>()=>dispatch(new CategorySearchCmd(category0, category1, category2,
            category3, brands, priceFrom, priceTo, null, null, fts, newArrivals, onSale, orderBy, true).toPlainJSON()),

        onTouchOut: ()=>Actions.pop()
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log(stateProps.items)
    return {
        ...stateProps, ...dispatchProps,
        items: stateProps.items.map(item=> {
            return {
                ...item, onPress: dispatchProps.searchDispatcher(
                    stateProps.category0,
                    stateProps.category1,
                    stateProps.category2,
                    stateProps.category3,
                    stateProps.brands,
                    stateProps.priceFrom,
                    stateProps.priceTo,
                    stateProps.fts,
                    stateProps.newArrivals,
                    stateProps.onSale,
                    item.orderBy
                )
            }

        })
    }
};

const OrderByModal = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(OptionModal);

export default OrderByModal