/**
 * Created by xavier on 5/16/16.
 */
import {HandlerOf} from 'redux-realtime-cqrs'
import {AddTaskCmd, FindTaskByIdCmd, ToggleTaskCmd, DeleteTaskByIdCmd} from './Commands'
import {TaskAddedEvt, TasksCleanedEvt, TaskToggledEvt, TaskDeletedEvent} from './Events'
import Constants from '../project/Constants' // Cambiar

@HandlerOf([AddTaskCmd])
export class AddTaskCmdHandler {
    static run(dispatch, action) {
        let tempId = parseInt(Math.random() * 1000);
        let task = {
            tempId: tempId,
            id: tempId,
            name: action.name,
            status: Constants.SERVER_PENDING,
            timestamp: new Date().getTime()
        };


        fetch(`http://localhost:9000/projects/${action.projectId}/todos`, {
            method: 'post',
            body: JSON.stringify(task),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            response.json().then((json)=> {

                let taskAdded = new TaskAddedEvt(
                    json.data.id,
                    action.name,
                    Constants.SERVER_READY,
                    new Date().getTime(),
                    false,
                    tempId).toPlainJSON();
                dispatch(taskAdded)
            });
        });
        return new TaskAddedEvt(
            tempId,
            action.name,
            Constants.SERVER_PENDING,
            new Date().getTime(),
            false,
            tempId).toPlainJSON()
    }
}

@HandlerOf([ToggleTaskCmd])
export class ToggleTaskCmdHandler {
    static run(dispatch, action, state) {

        let task = state.tasks.find(task=>task.id === action.id);
        fetch(`http://localhost:9000/todos/${action.id}/toggle`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            response.json().then((json)=> {
                //id:string, name:string, status:string, timestamp:number, completed:boolean, tempId:string
                dispatch(new TaskAddedEvt(task.id, task.name, Constants.SERVER_READY, task.timestamp, !task.completed, task.tempId).toPlainJSON())
            });
        });
        return new TaskAddedEvt(task.id, task.name, Constants.SERVER_PENDING, task.timestamp, !task.completed, task.tempId).toPlainJSON()
    }
}

@HandlerOf([FindTaskByIdCmd])
export class FindTaskByIdCmdHandler {
    static run(dispatch, action, state) {

        fetch(`http://localhost:9000/todos/${action.id}`)
            .then(function (response) {
                response.json().then((json)=> {
                    let data = json.data;
                    let task = new TaskAddedEvt(data.id, data.name, data.status, data.timestamp, data.completed, data.id);
                    dispatch(task.toPlainJSON())
                });
            });

    }
}

@HandlerOf([DeleteTaskByIdCmd])
export class DeleteTaskByIdCmdHandler {
    static run(dispatch, action, state) {

        fetch(`http://localhost:9000/todos/${action.id}`,
            {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(function (response) {
                response.json().then((json)=> {
                    let data = json.data;
                    console.log(new TaskDeletedEvent(action.id).toPlainJSON())
                    dispatch(new TaskDeletedEvent(action.id).toPlainJSON());
                });
            });
        let task = state.tasks.find(item=>item.id == action.id);
        return new TaskAddedEvt(task.id, task.name, Constants.SERVER_PENDING, task.timestamp, task.completed, task.tempId).toPlainJSON()
    }
}