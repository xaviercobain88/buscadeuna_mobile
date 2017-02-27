/**
 * Created by xavier on 5/11/16.
 */
import {Action, IdentifiedAction} from 'redux-realtime-cqrs'

export class AddTaskCmd extends Action {

    projectId:string;
    name:string;


    constructor(projectId:string, name:string) {
        super();
        this.name = name;
        this.projectId = projectId;
    }
}


export class ToggleTaskCmd extends IdentifiedAction {
}

export class FindTaskByIdCmd extends IdentifiedAction {
}

export class DeleteTaskByIdCmd extends IdentifiedAction {
}

