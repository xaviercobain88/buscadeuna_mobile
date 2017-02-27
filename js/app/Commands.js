/**
 * Created by xavier on 5/11/16.
 */
import {Action, IdentifiedAction} from 'redux-realtime-cqrs'

export class GoHomeCmd extends Action {
}

export class GoBackCmd extends Action {
}

export class GoSearchCmd extends Action {
}
export class GoOrderByModalCmd extends Action {
}

export class ShowFtsBoxCmd extends Action {
}

export class HideFtsBoxCmd extends Action {
}


export class FtsChangeTextCmd extends Action {

    fts:string;


    constructor(fts:string) {
        super();
        this.fts = fts;
    }
}


export class GoRefineCmd extends Action {
    section:String;

    constructor(section:String) {
        super();
        this.section = section;
    }
}

export class GoSubcategoryModalCmd extends Action {
    category:string;

    constructor(category:string) {
        super();
        this.category = category;
    }
}

export class GoSubcategory2ModalCmd extends Action {
    category:string;
    subcategory:string;

    constructor(category:string, subcategory:string) {
        super();
        this.category = category;
        this.subcategory = subcategory;
    }
}


export class FocusOnSearchCmd extends Action {
}