'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PathRegExp = _interopDefault(require('path-to-regexp'));

// const ROUTE_MAP = new Map();
const ROUTE_MAP = new Map();
/**
 * Generates a express style regexp for a given route and stores in a Map
 * @param  {string} route The route that should be converted into a regexp
 * @return {Object}       Returns an object with param keys and a path regexp
 */
function getParameterizedPath(route, options = { useMap: true, }) {
    if (ROUTE_MAP.has(route) && options.useMap) {
        return ROUTE_MAP.get(route);
    }
    else {
        let keys = [];
        //@ts-ignore
        let result = new PathRegExp(route, keys);
        // console.log({ route, }, {
        //   re: result,
        //   keys,
        // });
        ROUTE_MAP.set(route, {
            re: result,
            keys,
        });
        return { keys, re: result, };
    }
}
/**
 * Finds a matching dynamic route from manifest
 * @param  {Object|Array} routes   The manifest configuration object
 * @param  {string} location The window location that should be resolved
 * @return {string}          A matching dynamic route
 */
function findMatchingRoutePath(routes, location, options = {}) {
    const { return_matching_keys, } = options;
    let matching;
    let params;
    let re;
    location = (/\?[^\s]+$/.test(location)) ? location.replace(/^([^\s\?]+)\?[^\s]+$/, '$1') : location;
    const routeArray = Array.isArray(routes) ? routes : Object.keys(routes);
    routeArray.forEach(function (key) {
        var result = getParameterizedPath(key, options);
        if (result.re.test(location) && !matching) {
            matching = key;
            re = result.re;
            if (return_matching_keys) {
                const matchingParams = result.re.exec(matching);
                const matchingVals = location.match(result.re);
                if (matchingVals && matchingParams) {
                    params = matchingVals.reduce((result, val, idx) => {
                        if (idx !== 0 && typeof val === 'string')
                            result[matchingParams[idx].replace(':', '')] = val;
                        return result;
                    }, {});
                }
            }
        }
    });
    // console.log({ routes, location, matching, });
    return return_matching_keys && matching ? {
        route: matching,
        location,
        params,
        re,
    }
        : matching;
}

exports.findMatchingRoutePath = findMatchingRoutePath;
exports.getParameterizedPath = getParameterizedPath;
exports.ROUTE_MAP = ROUTE_MAP;
