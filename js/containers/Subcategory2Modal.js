import {connect} from 'react-redux'
import OptionModal from '../components/OptionModal'
import {Actions} from 'react-native-router-flux';
import {GoBackCmd, GoSubcategory2ModalCmd} from '../app/Commands'
import {CategorySearchCmd} from '../filter/Commands'
import {NEW_ARRIVALS, ON_SALE, SUBCATEGORY, CATEGORY} from '../filter/Constants';


const mapStateToProps = (state) => {


    let props = {
        categoryName: state.search.category0,
        subcategoryName: state.search.category1,
        subcategories: _getSubcategories(state),
        isVisible: true,
        parent: this.categoryName
    }
    props.parent = props.categoryName;
    return props;
};

function _getSubcategories(state) {
    let categoryName = state.search.category0;
    let subcategoryName = state.search.category1;
    let subcategory = state.filters.categories
        .find(category=>category.name == categoryName)
        .children
        .find(subcategory=>subcategory.name == subcategoryName);


    let subcategories2Level = subcategory.children.map(subcategory=> {
        subcategory.color = '#222';
        subcategory.type = SUBCATEGORY;
        return subcategory
    });


    if (subcategory.hasNewArrivals) {
        subcategories2Level = [{name: NEW_ARRIVALS, type: NEW_ARRIVALS, color: '#222'}, ... subcategories2Level]
    }
    subcategories2Level = [{name: "Todo " + subcategoryName, type: CATEGORY, color: '#222'}, ... subcategories2Level];
    if (subcategory.onSale) {
        subcategories2Level = [... subcategories2Level, {name: ON_SALE, type: ON_SALE, color: '#fc582f'}]
    }
    return subcategories2Level
}

const mapDispatchToProps = (dispatch) => {

    return {
        onTouchOut: ()=> {
            dispatch(new GoBackCmd().toPlainJSON());
            dispatch(new GoBackCmd().toPlainJSON())
        },
        onPressCategory: null,
        onPressSubcategory: (category, subcategory, subcategory2Level)=> {
            dispatch(new GoBackCmd().toPlainJSON())
            setTimeout(()=>dispatch(new CategorySearchCmd(category, subcategory, subcategory2Level).toPlainJSON()), 0)
        },
        onPressNewArrivals: null,
        onPressOnSale: null
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps, ...dispatchProps,
        items: stateProps.subcategories.map(subcategory2Level=> {
            return {
                ...subcategory2Level,
                onPress: ()=> {
                    switch (subcategory2Level.type) {
                        case SUBCATEGORY:
                            return dispatchProps.onPressSubcategory(stateProps.categoryName,
                                stateProps.subcategoryName, subcategory2Level.name)
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