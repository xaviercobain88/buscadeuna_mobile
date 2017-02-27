import {connect} from 'react-redux'
import HomeSection from '../components/sections/HomeSection'
import {Actions} from 'react-native-router-flux';
import {FocusOnSearchCmd, GoHomeCmd, GoSubcategoryModalCmd} from '../app/Commands'



const mapStateToProps = (state) => {
    return {
        categories: state.filters.categories,
        topSearches: state.topSearches,
        isSearchingFocused: state.search.isFocused
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        onFocusOnSearch: ()=>dispatch(new FocusOnSearchCmd().toPlainJSON()),
        onBackButton: ()=>/*console.log("se blurea");*/dispatch(new GoHomeCmd().toPlainJSON()),
        onCategorySelected: (categoryName)=>dispatch(new GoSubcategoryModalCmd(categoryName).toPlainJSON()),
        // onCategoriesSelected: (category0, category1, category2) =>
        //     dispatch(new CategorySearchCmd(category0, category1, category2).toPlainJSON())
    }
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeSection);

export default Home