/**
 * Created by xavier on 5/13/16.
 */


export function RealTime(path:string, onUpdate:any, onDelete:any, onUpdateStream:Array<[string, any]>) {

    // console.log(streams);
    return function (target) {

        target.prototype.getRealTimePathFolder = ()=>(path ? path : target.name );
        target.prototype.getModelType = ()=>target.name;
        if (onDelete) {
            onDelete.prototype.getFolder = ()=> {
                console.log("si se modifico");
                return (path ? path : target.name )
            };
        }
        target.prototype.isRealTime = ()=>true;
        target.prototype.getOnUpdateAction = ()=>onUpdate;
        target.prototype.getOnDeleteAction = ()=>onDelete;
        target.prototype.getOnUpdateStreamActions = ()=>onUpdateStream;
    }
}

export function HandlerOf(handledCommandTypes) {
    "use strict";
    return (target) => {
        // console.log(target);
        target.prototype.getHandledCommandTypes = ()=>handledCommandTypes;
        target.getHandledCommandTypes = ()=>handledCommandTypes;
    }
}
