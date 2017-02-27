/**
 * Created by xavier on 5/11/16.
 */
import {Action, IdentifiedAction, RealTime} from 'redux-realtime-cqrs'
import {FindProjectByIdCmd, GetTasksProjectCmd, SelectProjectCmd, NotifyProjectDeletedCmd} from './Commands';


export class ProjectDeletedEvent extends IdentifiedAction {
}
export class ProjectsCleanedEvt extends Action {
}

@RealTime("projects", FindProjectByIdCmd, NotifyProjectDeletedCmd, [["todos", GetTasksProjectCmd]])
export class ProjectAddedEvt extends IdentifiedAction {

    name:string;
    status:string;
    timestamp:number;
    tempId:string;

    constructor(id:string, name:string, status:string, timestamp:number, tempId:string) {
        super(id);
        this.name = name;
        this.status = status;
        this.timestamp = timestamp;
        this.tempId = tempId;
    }
}


export class ProjectSelectedEvt extends IdentifiedAction {
}

