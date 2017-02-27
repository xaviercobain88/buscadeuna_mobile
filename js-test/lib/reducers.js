/**
 * Created by xavier on 5/11/16.
 */

import {SubscriptionAddedEvt, SubscriptionDeletedEvt} from './defaultActions'

export function subscriptions(state = [], action = {}) {

    switch (action.type) {


        case SubscriptionAddedEvt.name:
            return {
                ...state, [action.folder]: {
                    ...state[action.folder], [action.id]: {
                        subscription: action.subscription,
                        onStream: action.onStream,
                        ...action.streams.reduce(function (previousValue, currentTuple, currentIndex, array) {
                            return {...previousValue, [currentTuple[0]]: {subscription: currentTuple[1]}};
                        }, {})
                    }
                }
            };
        case SubscriptionDeletedEvt.name:
            let folder = {...state[action.folder]};
            if (action.stream === null) {
                delete folder[action.id];
            } else {
                delete folder[action.stream];
            }

            return {...state, [action.folder]: folder};

        default:
            return state;
    }
}


