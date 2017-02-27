/**
 * Created by xavier on 5/19/16.
 */

export class Action {
    type:string;

    constructor() {
        this.type = this.constructor.name;
    }

    getRealTimePath():string {
        return this.getRealTimePathFolder() + "/" + this.id;
    }

    getRealTimePathFolder() {
        return ""
    }


    isRealTime():boolean {
        return false;
    }


    toPlainJSON() {
        let jsoned = {};
        let toConvert = this;
        Object.getOwnPropertyNames(toConvert).forEach((prop) => {
            const val = toConvert[prop];
            if (prop === 'toPlainJSON' || prop === 'constructor') {
                return;
            }
            if (typeof val === 'function') {
                jsoned[prop] = val.bind(jsoned);
                return;
            }
            jsoned[prop] = val;
        });
        
        if (this.isRealTime !== undefined) jsoned.isRealTime = this.isRealTime();
        if (this.getRealTimePath !== undefined) jsoned.realTimePath = this.getRealTimePath();
        if (this.getRealTimePathFolder !== undefined) jsoned.realTimePathFolder = this.getRealTimePathFolder();
        if (this.getOnUpdateAction !== undefined) jsoned.onUpdateAction = this.getOnUpdateAction();
        if (this.getOnUpdateStreamActions !== undefined) jsoned.onUpdateStreams = this.getOnUpdateStreamActions();
        if (this.getOnDeleteAction !== undefined) jsoned.onDeleteAction = this.getOnDeleteAction();
        if (this.getFolder !== undefined) jsoned.folderForDelete = this.getFolder();
        
        return jsoned;
    }
}

export class IdentifiedAction extends Action {
    id:string;

    constructor(id:string) {
        super();
        this.id = id;
    }
}
export class SubscriptionAddedEvt extends IdentifiedAction {
    folder:string;
    subscription:any;
    onStream:boolean;
    streams:Array<[string, any]>;


    constructor(folder:string, id:string, subscription:any, onStream:boolean, streams:Array<[string, any]>) {
        super(id);
        this.subscription = subscription;
        this.onStream = onStream;
        this.streams = streams;
        this.folder = folder;
    }
}

export class SubscriptionDeletedEvt extends IdentifiedAction {
    folder:string;
    stream:string;

    constructor(folder:string, id:string, stream:string = null) {
        super(id);
        this.folder = folder;
        this.stream = stream;
    }
}
