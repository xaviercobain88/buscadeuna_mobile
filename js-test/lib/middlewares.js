/**
 * Created by xavier on 4/25/16.
 */
// @flow
import configConstants from './configConstants'
import realTimeVendorConstants from  './realTimeVendorConstants'
import FirebaseRx from 'firebase-rx'
import {SubscriptionAddedEvt, SubscriptionDeletedEvt} from './defaultActions'

const SUBSCRIPTIONS = "subscriptions";

function getRealTimeVendorFromConfigItem(realTimeVendorItem) {
    return Object.keys(realTimeVendorConstants).map(key => realTimeVendorConstants[key]).some(
        (realTimeVendor:string)=>realTimeVendor === realTimeVendorItem[1]
    );
}


function getRealTimeVendorItem(config) {
    return config.some((configItem:[string, string])=> {
        return configItem[0] === configConstants.REAL_TIME_VENDOR
    });
}

function getFirebasePath(config, entityPath) {
    return config.find(item=>item[0] === configConstants.FIREBASE_URL)[1] + entityPath + "/timestamp";
}

var subscriptions = {};
export const realTimeUpdatingMiddleware = (config:Array<[string, string]>) => store => next => action => {

    let realTimeVendorItem:[string, string] = getRealTimeVendorItem(config);

    let realTimeVendor = realTimeVendorConstants.FIREBASE;
    if (realTimeVendorItem)
        realTimeVendor = getRealTimeVendorFromConfigItem(realTimeVendorItem) ?
            getRealTimeVendorFromConfigItem(realTimeVendorItem) :
            realTimeVendorConstants.FIREBASE;

    let result = next(action);


    if (action.isRealTime === true &&
        (store.getState()[SUBSCRIPTIONS][action.realTimePathFolder] === undefined
        || store.getState()[SUBSCRIPTIONS][action.realTimePathFolder][action.id] === undefined)
    ) {

        let subscriptionId = action.id;
        let subscriptionFolder = action.realTimePathFolder;
        let subscriptionOnStream = false;
        let subscriptionStreams = [];


        console.log(getFirebasePath(config, action.realTimePath));
        let source = new FirebaseRx(getFirebasePath(config, action.realTimePath))
            .observe('value');

        let subscription = source.skip(1).takeWhile(changeData=>(changeData.val() !== null)).subscribe(function (changeData) {
            console.log("este es un callback");
            if (changeData.val()) {
                store.dispatch(new action.onUpdateAction(action.id).toPlainJSON());
            } else if (action.onDeleteAction) {
                let onDeleteAction = new action.onDeleteAction(action.id);
                store.dispatch(onDeleteAction.toPlainJSON());
                store.dispatch(new SubscriptionDeletedEvt(action.realTimePathFolder, action.id).toPlainJSON());
            }
        }, ()=>console.log("hubo un error"), ()=> {
            if (action.onDeleteAction) {
                let onDeleteAction = new action.onDeleteAction(action.id);
                store.dispatch(onDeleteAction.toPlainJSON());
                store.dispatch(new SubscriptionDeletedEvt(action.realTimePathFolder, action.id).toPlainJSON());
            }
        });


        if (action.onUpdateStreams) {
            action.onUpdateStreams.forEach(([stream, streamAction])=> {
                let streamSource = new FirebaseRx(getFirebasePath(config, action.realTimePath + "/" + stream))
                    .observe('value');

                let streamSubscription = streamSource.skip(1).takeWhile(changeData=>(changeData.val() !== null)).subscribe(function (changeData) {
                    store.dispatch(new streamAction(action.id).toPlainJSON());
                }, ()=>console.log("hubo un error"), ()=> {
                    store.dispatch(new SubscriptionDeletedEvt(action.realTimePathFolder, action.id, stream).toPlainJSON());

                });

                subscriptionStreams.push([stream, streamSubscription]);
            });
        }
        store.dispatch(new SubscriptionAddedEvt(subscriptionFolder, subscriptionId, subscription, subscriptionOnStream, subscriptionStreams).toPlainJSON());
        return result;

    } else if (action.folderForDelete !== undefined &&
        store.getState()[SUBSCRIPTIONS][action.folderForDelete] !== undefined
        && store.getState()[SUBSCRIPTIONS][action.folderForDelete][action.id] !== undefined) {

        let subscriptionForDisposing = store.getState()[SUBSCRIPTIONS][action.folderForDelete][action.id]["subscription"];
        subscriptionForDisposing.dispose();
        store.dispatch(new SubscriptionDeletedEvt(action.folderForDelete, action.id).toPlainJSON());

    }

    return result
};


export const cqrsMiddleware = handlers => store => next => action => {
    handlers.filter(handler=> {
            return handler.getHandledCommandTypes().map(handledCommand => handledCommand.name).indexOf(action.type) > -1
        }
    ).forEach(handler=> {
        let newAction = handler.run(store.dispatch, action, store.getState());
        if (newAction && JSON.stringify(newAction) !== JSON.stringify(action) && newAction.type)
            store.dispatch(newAction);
    });

    next(action);


};
