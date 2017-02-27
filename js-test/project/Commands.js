/**
 * Created by xavier on 5/11/16.
 */
import {Action, IdentifiedAction} from 'redux-realtime-cqrs'


const GetProjectsCmd = "GetProjectsCmd";


export class FindProjectsCmd extends Action {
}

export class SelectProjectCmd extends IdentifiedAction {
}

export class GetTasksProjectCmd extends IdentifiedAction {
}


export class AddProjectCmd extends Action {
    name:string;

    constructor(name) {
        super();
        this.name = name;
    }
}
export class FindProjectByIdCmd extends IdentifiedAction {
}

export class DeleteProjectByIdCmd extends IdentifiedAction {
}

export class NotifyProjectDeletedCmd extends IdentifiedAction {
}
