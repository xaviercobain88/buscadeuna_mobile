/**
 * Created by xavier on 5/11/16.
 */
import {Action, IdentifiedAction, RealTime} from 'redux-realtime-cqrs'

export class InitDataGotEvt extends Action {
    categories:Array<any>;
    topSearches:Array<any>;
    brands:Array<any>;

    constructor(categories:Array<any>, topSearches:Array<any>, brands:Array<any>) {
        super();

        this.categories = categories;
        this.topSearches = topSearches;
        this.brands = brands;
    }
}

export class ProductsCleanedEvt extends Action {

}

export class FlatCategoriesSetEvt extends Action {


    flatCategories:Array<any>;


    constructor(flatCategories:Array<any>) {
        super();
        this.flatCategories = flatCategories;
    }
}

export class FtsSuggestionsSetEvt extends Action {

    categories:Array<any>;
    brands:Array<any>;


    constructor(categories:Array<any>, brands:Array<any>) {
        super();
        this.categories = categories;
        this.brands = brands;
    }
}
export class ShowSuggestionsEvt extends Action {
    fts:String;


    constructor(fts:String) {
        super();
        this.fts = fts;
    }
}

export class HideSuggestionsEvt extends Action {

}


export class ProductsFetchedEvt extends Action {
    products:Array;


    constructor(products:Array) {
        super();
        this.products = products;
    }
}

export class SearchSetEvt extends Action {
    category0:String;
    category1:String;
    category2:String;
    category3:String;
    brands:Array<String>;
    priceFrom:Number;
    priceTo:Number;
    page:Number;
    size:Number;
    fts:String;
    orderBy:String;
    newArrivals:Boolean;
    onSale:Boolean;
    completed:Boolean;


    constructor(category0:String,
                category1:String,
                category2:String,
                category3:String,
                brands:Array<String>,
                priceFrom:Number,
                priceTo:Number,
                fts:String,
                page:Number,
                size:Number,
                newArrivals:Boolean,
                onSale:Boolean,
                orderBy:String,
                completed:Boolean) {
        super();
        this.category0 = category0;
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.brands = brands;
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.page = page;
        this.size = size;
        this.fts = fts;
        this.newArrivals = newArrivals;
        this.onSale = onSale;
        this.orderBy = orderBy;
        this.completed = completed;
    }
}