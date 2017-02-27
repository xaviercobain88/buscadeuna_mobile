/**
 * Created by xavier on 5/16/16.
 */
import {HandlerOf} from 'redux-realtime-cqrs'
import {
    FindFiltersCmd,
    CategorySearchCmd,
    FlatCategoriesCmd
} from './Commands'
import {
    InitDataGotEvt, SearchSetEvt, ProductsCleanedEvt, ProductsFetchedEvt,
    FlatCategoriesSetEvt, HideSuggestionsEvt
} from './Events'
import {GoHomeCmd} from '../app/Commands'
import {Actions} from 'react-native-router-flux';
import {jsonToQueryString} from '../Util'


@HandlerOf([FindFiltersCmd])
export class FindFiltersHandler {
    static run(dispatch, action) {

        fetch("https://api.buscadeuna.com/mobile-init")
            .then(function (response) {
                response.json().then((json)=> {
                    dispatch(new InitDataGotEvt(json.data.productTypes, json.data.topSearches, json.data.brands).toPlainJSON());
                    dispatch(new FlatCategoriesCmd().toPlainJSON());
                    dispatch(new GoHomeCmd().toPlainJSON())
                });
            });
    }
}

@HandlerOf([FlatCategoriesCmd])
export class FlatCategoriesHandler {
    static run(dispatch, action, state) {

        let flatCategories = [];

        state.filters.categories.forEach(category0=> {
            if (category0.children) {
                category0.children.forEach(category1=> {
                    flatCategories.push({
                        name: category1.name,
                        category0: category0.name,
                        category1: category1.name,
                        category2: null,
                        category3: null
                    });
                    if (category1.children) {
                        category1.children.forEach(category2=> {
                            flatCategories.push({
                                name: category2.name,
                                category0: category0.name,
                                category1: category1.name,
                                category2: category2.name,
                                category3: null
                            });

                            if (category2.children) {
                                category2.children.forEach(category3=> {
                                    flatCategories.push({
                                        name: category3.name,
                                        category0: category0.name,
                                        category1: category1.name,
                                        category2: category2.name,
                                        category3: category3.name
                                    });
                                });
                            }

                        });
                    }
                })
            }
        });
        flatCategories = flatCategories.sort((a, b)=> {
            return a.name > b.name
        });

        dispatch(new FlatCategoriesSetEvt(flatCategories).toPlainJSON());


    }
}

@HandlerOf([CategorySearchCmd])
export class CategorySearchHandler {
    static run(dispatch, action) {

        if (action.pop) {
            Actions.pop()
        } else {
            Actions.search()
        }

        let category0 = action.category0,
            category1 = action.category1,
            category2 = action.category2,
            category3 = action.category3,
            brands = action.brands,
            priceFrom = action.priceFrom,
            priceTo = action.priceTo,
            fts = action.fts,
            page = action.page,
            newArrivals = action.newArrivals,
            onSale = action.onSale,
            orderBy = action.orderBy,
            size = action.size;


        let searchSetEvt = new SearchSetEvt(
            category0,
            category1,
            category2,
            category3,
            brands,
            priceFrom,
            priceTo,
            fts,
            page,
            size,
            newArrivals,
            onSale,
            orderBy,
            false
        );

        dispatch(searchSetEvt.toPlainJSON());
        dispatch(new ProductsCleanedEvt().toPlainJSON());
        dispatch(new HideSuggestionsEvt().toPlainJSON());

        let url = "https://api.buscadeuna.com/products" + jsonToQueryString({
                category0,
                category1,
                category2,
                category3,
                brands,
                priceFrom,
                priceTo,
                fts,
                page,
                size,
                orderBy
            });

        fetch(url).then(function (response) {
            response.json().then((json)=> {
                searchSetEvt.completed = true;
                dispatch(searchSetEvt.toPlainJSON());
                dispatch(new ProductsFetchedEvt(json.data).toPlainJSON());

            });
        });







    }
}