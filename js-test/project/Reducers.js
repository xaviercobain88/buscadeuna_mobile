/**
 * Created by xavier on 5/11/16.
 */

import {ProjectAddedEvt, ProjectSelectedEvt, ProjectDeletedEvent, ProjectsCleanedEvt} from './Events'

export function projects(state = [], action = {}) {
    switch (action.type) {


        case ProjectAddedEvt.name:
            let newState = [
                ...[...state].filter(item=>item.id != action.id && (!item.tempId || item.tempId != action.tempId)),
                action
            ];
            newState.sort((a, b)=>b.timestamp - a.timestamp);
            return newState;


        case ProjectDeletedEvent.name:
            return [
                ...[...state].filter(item=>item.id != action.id && (!item.tempId || item.tempId != action.tempId))
            ];
        case ProjectsCleanedEvt.name:
            return [];
        default:
            return state;
    }
}

export function selectedProjectId(state = {}, action = {}) {
    switch (action.type) {

        case ProjectSelectedEvt.name:
            return action.id;
        default:
            return state;
    }
}
