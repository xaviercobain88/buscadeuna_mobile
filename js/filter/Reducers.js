/**
 * Created by xavier on 5/11/16.
 */

import {
    InitDataGotEvt,
    ProductsCleanedEvt,
    ProductsFetchedEvt,
    FlatCategoriesSetEvt,
    FtsSuggestionsSetEvt,
    ShowSuggestionsEvt,
    HideSuggestionsEvt
} from './Events'

export function filters(state = {
    suggestedBrands: [],
    suggestedCategories: []
}, action = {}) {
    switch (action.type) {

        case FlatCategoriesSetEvt.name:

            return {...state, flatCategories: action.flatCategories};

        case InitDataGotEvt.name:

            return {...state, "categories": action.categories, brands: action.brands};

        case ShowSuggestionsEvt.name:
            return {...state, showSuggestions: true, ftsForSuggestions: action.fts};

        case HideSuggestionsEvt.name:
            return {...state, showSuggestions: false};

        case FtsSuggestionsSetEvt.name:


            return {
                ...state, suggestedBrands: action.brands,
                suggestedCategories: action.categories
            };


        default:
            return state;

    }
}

export function products(state = [], action = {}) {
    switch (action.type) {

        case ProductsCleanedEvt.name:
            return [];

        case ProductsFetchedEvt.name:

            return action.products;

        default:
            return state;

    }
}

export function topSearches(state = [], action = {}) {
    switch (action.type) {

        case InitDataGotEvt.name:

            return action.topSearches;

        default:
            return state;

    }
}
