/**
 * Created by xavier on 5/16/16.
 */
import {HandlerOf} from 'redux-realtime-cqrs'
import {
    AddProjectCmd,
    FindProjectByIdCmd,
    FindProjectsCmd,
    SelectProjectCmd,
    GetTasksProjectCmd,
    NotifyProjectDeletedCmd,
    DeleteProjectByIdCmd
} from './Commands'
import {TasksCleanedEvt, TaskAddedEvt, TaskDeletedEvent} from '../task/Events'
import {ProjectAddedEvt, ProjectSelectedEvt, ProjectsCleanedEvt, ProjectDeletedEvent} from './Events'
import {Actions} from 'react-native-router-flux';
import Constants from './Constants'

@HandlerOf([SelectProjectCmd])
export class SelectProjectCmdHandler {
    static run(dispatch, action) {

        Actions.taskList();
        console.log(action.id);
        dispatch(new ProjectSelectedEvt(action.id).toPlainJSON());
        // dispatch(new GetTasksProjectCmd(action.payload).toPlainJSON());
        return new GetTasksProjectCmd(action.id).toPlainJSON();

    }
}
@HandlerOf([GetTasksProjectCmd])
export class GetTasksProjectCmdHandler {
    static run(dispatch, action, state) {

        if (state.selectedProjectId == action.id) {
            state.tasks.forEach((task)=>dispatch(new TaskDeletedEvent(task.id).toPlainJSON()));
            fetch(`http://localhost:9000/projects/${action.id}/todos`)
                .then(function (response) {
                    response.json().then((json)=> {
                        //id:string, name:string, status: string, timestamp:number,tempId: string
                        Object.keys(json.data)
                            .map(key=>json.data[key]).map(item=>new TaskAddedEvt(item.id, item.name, item.status, item.timestamp, item.completed, item.id).toPlainJSON()).forEach(evt=>dispatch(evt))
                    });
                });
        }



    }
}

@HandlerOf([NotifyProjectDeletedCmd])
export class NotifyProjectDeletedCmdHandler {
    static run(dispatch, action, state) {
        if (state.selectedProjectId === action.id) {
            console.log("vea el projecto se elimino")

            Actions.projectList()
        }
        dispatch(new FindProjectsCmd().toPlainJSON())
    }
}

@HandlerOf([FindProjectsCmd])
export class FindProjectsCmdHandler {
    static run(dispatch, action) {

        dispatch(new ProjectsCleanedEvt().toPlainJSON());
        fetch('http://localhost:9000/projects')
            .then(function (response) {
                response.json().then((json)=> {

                    Object.keys(json.data).map((key)=> {
                        let data = json.data[key];
                        let project = new ProjectAddedEvt(data.id, data.name, data.status, data.timestamp, data.id);
                        return new ProjectAddedEvt(data.id, data.name, data.status, data.timestamp, data.id).toPlainJSON()
                    }).forEach(evt=>dispatch(evt))
                });
            });

    }
}


@HandlerOf([AddProjectCmd])
export class AddProjectCmdHandler {
    static run(dispatch, action) {
        let tempId = parseInt(Math.random() * 1000);
        let project = {
            tempId: tempId,
            id: tempId,
            name: action.name,
            status: Constants.SERVER_PENDING,
            timestamp: new Date().getTime()
        };

        fetch('http://localhost:9000/projects', {
            method: 'post',
            body: JSON.stringify(project),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            response.json().then((json)=> {
                dispatch(new ProjectAddedEvt(
                    json.data.id,
                    action.name,
                    Constants.SERVER_READY,
                    new Date().getTime(),
                    json.data.tempId
                ).toPlainJSON())
            });
        });
        return new ProjectAddedEvt(
            tempId,
            action.name,
            Constants.SERVER_PENDING,
            new Date().getTime(),
            tempId
        ).toPlainJSON()
    }
}

@HandlerOf([FindProjectByIdCmd])
export class FindProjectByIdCmdHandler {
    static run(dispatch, action, state) {

        fetch(`http://localhost:9000/projects/${action.id}`)
            .then(function (response) {
                response.json().then((json)=> {
                    let data = json.data;
                    let project = new ProjectAddedEvt(data.id, data.name, data.status, data.timestamp, data.id);
                    dispatch(project.toPlainJSON())
                });
            });

    }
}

@HandlerOf([DeleteProjectByIdCmd])
export class DeleteProjectByIdCmdHandler {
    static run(dispatch, action, state) {

        fetch(`http://localhost:9000/projects/${action.id}`,
            {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(function (response) {
                response.json().then((json)=> {
                    let data = json.data;
                    dispatch(new ProjectDeletedEvent(action.id).toPlainJSON());
                });
            });
        let project = state.projects.find(item=>item.id == action.id);
        return new ProjectAddedEvt(project.id, project.name, Constants.SERVER_PENDING, project.timestamp, project.tempId).toPlainJSON()
    }
}


