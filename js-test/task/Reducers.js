/**
 * Created by xavier on 5/11/16.
 */

import {TaskAddedEvt, TasksCleanedEvt, TaskToggledEvt, TaskDeletedEvent} from './Events'

export default function reducer(state =[], action = {}) {
    switch (action.type) {
        case TasksCleanedEvt.name:
            return []
                ;
        case TaskAddedEvt.name:
            var newState = [
                ...[...state].filter(item=>item.id != action.id && (!item.tempId || item.tempId != action.tempId)),
                action
            ];
            newState.sort((a, b)=>b.timestamp - a.timestamp);
            return newState;
        case TaskDeletedEvent.name:
            return [
                ...[...state].filter(item=>item.id != action.id && (!item.tempId || item.tempId != action.tempId))
            ];
            
        default:
            return state;
    }
}
