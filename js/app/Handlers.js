/**
 * Created by xavier on 5/16/16.
 */
import {HandlerOf} from 'redux-realtime-cqrs'
import {
    GoHomeCmd,
    FocusOnSearchCmd,
    GoSubcategoryModalCmd,
    GoOrderByModalCmd,
    GoSubcategory2ModalCmd,
    GoBackCmd,
    GoRefineCmd,
    GoSearchCmd,
    ShowFtsBoxCmd,
    FtsChangeTextCmd,
    HideFtsBoxCmd,
    HideSuggestionsCmd
} from './Commands'
import {CategorySearchCmd} from '../filter/Commands'
import {SearchFocusedEvt, SearchBlurEvt} from './Events'
import {SearchSetEvt, FtsSuggestionsSetEvt, ShowSuggestionsEvt, HideSuggestionsEvt} from '../filter/Events'
import {Actions} from 'react-native-router-flux';

@HandlerOf([GoHomeCmd])
export class GoHomeHandler {
    static run(dispatch, action) {
        Actions.home();
        return new SearchBlurEvt().toPlainJSON()
    }
}
@HandlerOf([GoBackCmd])
export class GoBackHandler {
    static run(dispatch, action) {
        Actions.pop();
    }
}

@HandlerOf([GoSearchCmd])
export class GoSearchHandler {
    static run(dispatch, action) {
        Actions.search();
    }
}

@HandlerOf([FtsChangeTextCmd])
export class FtsChangeTextHandler {
    static run(dispatch, action, state) {


        let suggestedCategories = state.filters.flatCategories.filter(category=> {
            return category.name.toLowerCase().indexOf(action.fts.toLowerCase()) >= 0
        });

        let suggestedBrands = state.filters.brands.filter(brand=> {
            return brand.name.toLowerCase().indexOf(action.fts.toLowerCase()) >= 0
        });

        dispatch(new FtsSuggestionsSetEvt(
            suggestedCategories.sort((a, b)=> {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }),
            suggestedBrands.sort((a, b)=> {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })).toPlainJSON());
        if (action.fts) {
            dispatch(new ShowSuggestionsEvt(action.fts).toPlainJSON())
        } else {
            dispatch(new HideSuggestionsEvt().toPlainJSON())
        }


    }
}


@HandlerOf([HideFtsBoxCmd])
export class HideFtsBoxHandler {
    static run(dispatch, action, state) {
        return new CategorySearchCmd(
            state.search.category0,
            state.search.category1,
            state.search.category2,
            state.search.category3,
            state.search.brands,
            state.search.priceFrom,
            state.search.priceTo,
            null,
            null,
            state.search.fts,
            state.search.newArrivals,
            state.search.onSale,
            state.search.orderBy,
            false
        ).toPlainJSON()
    }
}


@HandlerOf([GoRefineCmd])
export class GoRefineHandler {
    static run(dispatch, action) {

        Actions.refine();
        return action;
    }
}


@HandlerOf([FocusOnSearchCmd])
export class FocusOnSearchHandler {
    static run(dispatch, action) {
        return new SearchFocusedEvt().toPlainJSON()
    }
}


@HandlerOf([GoSubcategoryModalCmd])
export class GoSubcategoryModalHandler {
    static run(dispatch, action) {
        dispatch(new SearchSetEvt(action.category, null, null).toPlainJSON())
        Actions.subcategoryModal();
    }
}

@HandlerOf([GoOrderByModalCmd])
export class GoOrderByModalHandler {
    static run(dispatch, action) {
        Actions.orderByModal();
    }
}

@HandlerOf([GoSubcategory2ModalCmd])
export class GoSubcategory2ModalHandler {
    static run(dispatch, action) {
        dispatch(new SearchSetEvt(action.category, action.subcategory, null).toPlainJSON())
        Actions.pop();
        setTimeout(()=>Actions.subcategory2Modal(), 0);
    }
}