/**
 * Created by xavier on 5/23/16.
 */


import {subscriptions} from './reducers'
import {combineReducers as combineReducersRedux} from 'redux';


export  function combineReducers(reducers = {}) {

    return combineReducersRedux({...reducers, subscriptions})
    
};