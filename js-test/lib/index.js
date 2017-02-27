/**
 * Created by xavier on 5/23/16.
 */
'use strict';

exports.__esModule = true;

import {HandlerOf, RealTime} from './decorators'
import configConstants  from './configConstants'
import {Action, IdentifiedAction, SubscriptionAddedEvt, SubscriptionDeletedEvt}  from './defaultActions'
import {cqrsMiddleware, realTimeUpdatingMiddleware} from './middlewares'
import realTimeVendorConstants from './realTimeVendorConstants'
import {subscriptions} from './reducers'
import {combineReducers} from './utils'

exports.HandlerOf = HandlerOf;
exports.RealTime = RealTime;
exports.configConstants = configConstants;
exports.Action = Action;
exports.IdentifiedAction = IdentifiedAction;
exports.SubscriptionAddedEvt = SubscriptionAddedEvt;
exports.SubscriptionDeletedEvt = SubscriptionDeletedEvt;
exports.cqrsMiddleware = cqrsMiddleware;
exports.realTimeUpdatingMiddleware = realTimeUpdatingMiddleware;
exports.realTimeVendorConstants = realTimeVendorConstants;
exports.subscriptions = subscriptions;
exports.combineReducers = combineReducers;