/**
 * Created by xavier on 4/21/16.
 */
// @flow
import {realTimeVendorConstants, configConstants} from "redux-realtime-cqrs"

let config:Array<[string, string]> = [
    [configConstants.REAL_TIME_VENDOR, realTimeVendorConstants.FIREBASE],
    [configConstants.FIREBASE_URL, "https://testtttttttttttt.firebaseio.com/"]
];
export default config;