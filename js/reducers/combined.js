/**
 * Created by xavier on 4/26/16.
 */
import {combineReducers} from 'redux-realtime-cqrs';
import routes from './routes';
import {filters, topSearches, products} from '../filter/Reducers';
import {search} from  '../app/Reducers';

export default combineReducers({
    routes,
    filters,
    search,
    topSearches,
    products
});