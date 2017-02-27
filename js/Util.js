/**
 * Created by xavier on 8/24/16.
 */

export const jsonToQueryString = function (json) {
    return '?' +
        Object.keys(json).map(function (key) {
            if (json[key]) {
                if (Array.isArray(json[key]))
                    json[key] = json[key].join();
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }
            return "";

        }).join('&');
}
