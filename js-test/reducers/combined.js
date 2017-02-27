/**
 * Created by xavier on 4/26/16.
 */
import {combineReducers} from 'redux-realtime-cqrs';
import routes from './routes';
import {projects, selectedProjectId} from '../project/Reducers';
import tasks from '../task/Reducers';

export default combineReducers({
    projects,
    selectedProjectId,
    tasks,
    routes
});