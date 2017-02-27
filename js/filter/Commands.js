/**
 * Created by xavier on 5/11/16.
 */
import {Action, IdentifiedAction} from 'redux-realtime-cqrs'

export class FindFiltersCmd extends Action {
}

export class FlatCategoriesCmd extends Action {
}



export class CategorySearchCmd extends Action {
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
    newArrivals:Boolean;
    onSale:Boolean;
    orderBy:String;
    pop:Boolean;


    constructor(category0:String,
                category1:String,
                category2:String,
                category3:String,
                brands:Array<String>,
                priceFrom:Number,
                priceTo:Number,
                page:Number,
                size:Number,
                fts:String,
                newArrivals:Boolean,
                onSale:Boolean,
                orderBy:String,
                pop:Boolean) {
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
        this.pop = pop;
    }
}

