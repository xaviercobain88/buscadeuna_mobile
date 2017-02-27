/**
 * Created by xavier on 4/26/16.
 */
import {
    Router
} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {connect} from 'react-redux';
import Routes from './Routes'
import reducers from './reducers/combined';
import devTools from 'remote-redux-devtools';
import React from 'react-native';
import {
    realTimeUpdatingMiddleware,
    cqrsMiddleware
} from 'redux-realtime-cqrs'
import {
    AddProjectCmdHandler,
    FindProjectByIdCmdHandler,
    FindProjectsCmdHandler,
    SelectProjectCmdHandler,
    GetTasksProjectCmdHandler,
    NotifyProjectDeletedCmdHandler,
    DeleteProjectByIdCmdHandler
} from './project/Handlers'
import {
    AddTaskCmdHandler,
    FindTaskByIdCmdHandler,
    ToggleTaskCmdHandler,
    DeleteTaskByIdCmdHandler
} from './task/Handlers'
import config from './config'


const RouterWithRedux = connect()(Router);

let commandHandlers = [
    FindProjectsCmdHandler,
    SelectProjectCmdHandler,
    AddProjectCmdHandler,
    AddTaskCmdHandler,
    ToggleTaskCmdHandler,
    FindProjectByIdCmdHandler,
    FindTaskByIdCmdHandler,
    DeleteTaskByIdCmdHandler,
    GetTasksProjectCmdHandler,
    NotifyProjectDeletedCmdHandler,
    DeleteProjectByIdCmdHandler
];


const middleware = [cqrsMiddleware(commandHandlers), realTimeUpdatingMiddleware(config)];
const store = compose(
    applyMiddleware(...middleware),
    devTools()
)(createStore)(reducers);


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux scenes={Routes}/>
            </Provider>

        );
    }
}


