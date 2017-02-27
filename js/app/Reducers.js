/**
 * Created by xavier on 5/11/16.
 */

import {SearchFocusedEvt, SearchBlurEvt} from './Events'
import {SearchSetEvt} from '../filter/Events'
import {GoRefineCmd, ShowFtsBoxCmd} from './Commands'

export function search(state = {
    isFocused: false,
    category0: '',
    category1: '',
    category2: ''
}, action = {}) {
    switch (action.type) {


        case SearchFocusedEvt.name:

            return {...state, isFocused: true};
        case SearchBlurEvt.name:

            return {...state, isFocused: false};

        case GoRefineCmd.name:

            return {...state, section: action.section};

        case ShowFtsBoxCmd.name:
            return {...state, showFts: true};

        case SearchSetEvt.name:


            return {
                ...state,
                category0: action.category0,
                category1: action.category1,
                category2: action.category2,
                category3: action.category3,
                brands: action.brands ? action.brands : [],
                priceFrom: action.priceFrom,
                priceTo: action.priceTo,
                fts: action.fts,
                newArrivals: action.newArrivals,
                onSale: action.onSale,
                page: action.page,
                size: action.size,
                orderBy: action.orderBy,
                completed: action.completed,
                showFts: action.fts


            };

        default:
            return state;

    }
}

