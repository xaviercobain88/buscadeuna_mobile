import {connect} from 'react-redux'
import OptionModal from '../components/OptionModal'
import {Actions} from 'react-native-router-flux';
import {GoBackCmd, GoSubcategory2ModalCmd} from '../app/Commands'
import {NEW_ARRIVALS, ON_SALE, SUBCATEGORY, CATEGORY} from '../filter/Constants';


const mapStateToProps = (state) => {


    return {
        categoryName: state.search.category0,
        subcategoryName: state.search.category1,
        subcategories: _getSubcategories2Level(state),
        isVisible: true
    }
};

function _getSubcategories2Level(state) {

    let categoryName = state.search.category0;
    let category = state.filters.categories.find(category=>category.name == categoryName);

    let subcategories = category.children.map(subcategory=> {
        subcategory.color = '#222';
        subcategory.type = SUBCATEGORY;
        return subcategory
    });


    if (category.hasNewArrivals) {
        subcategories = [{name: NEW_ARRIVALS, type: NEW_ARRIVALS, color: '#222'}, ... subcategories]
    }
    subcategories = [{name: "Todo " + categoryName, type: CATEGORY, color: '#222'}, ... subcategories];
    if (category.onSale) {
        subcategories = [... subcategories, {name: ON_SALE, type: ON_SALE, color: '#fc582f'}]
    }
    return subcategories
}

const mapDispatchToProps = (dispatch) => {

    return {
        onTouchOut: ()=> dispatch(new GoBackCmd().toPlainJSON()),
        onPressCategory: null,
        onPressSubcategory: (category, subcategory)=>dispatch(new GoSubcategory2ModalCmd(category, subcategory)
            .toPlainJSON()),
        onPressNewArrivals: null,
        onPressOnSale: null
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps, ...dispatchProps,
        items: stateProps.subcategories.map(subcategory=> {
            return {
                ...subcategory,
                onPress: ()=> {
                    switch (subcategory.type) {
                        case SUBCATEGORY:
                            return dispatchProps.onPressSubcategory(stateProps.categoryName, subcategory.name)
                    }

                }
            }
        })

    }

}


const SubcategoryModal = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(OptionModal);

export default SubcategoryModal