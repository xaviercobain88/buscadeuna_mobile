/**
 * Created by xavier on 5/11/16.
 */
import {IdentifiedAction, Action, RealTime} from 'redux-realtime-cqrs'
import {FindTaskByIdCmd} from './Commands'

export class TasksCleanedEvt extends Action {
}
export class TaskDeletedEvent extends IdentifiedAction {
}

@RealTime("todos", FindTaskByIdCmd, TaskDeletedEvent)
export class TaskAddedEvt extends IdentifiedAction {
    name:string;
    status:string;
    timestamp:number;
    tempId:string;
    completed:boolean;

    constructor(id:string, name:string, status:string, timestamp:number, completed:boolean, tempId:string) {
        super(id);
        this.name = name;
        this.status = status;
        this.timestamp = timestamp;
        this.tempId = tempId;
        this.completed = completed

    }
}   


export class TaskToggledEvt extends IdentifiedAction {
    status:string;

    constructor(id:string, status:string) {
        super(id);
        this.status = status;

    }
}