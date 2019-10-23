import PathRegExp from 'path-to-regexp';
import types from '../types';
// const ROUTE_MAP = new Map();
export const ROUTE_MAP = new Map();

/**
 * Generates a express style regexp for a given route and stores in a Map
 * @param  {string} route The route that should be converted into a regexp
 * @return {Object}       Returns an object with param keys and a path regexp
 */
export function getParameterizedPath(route:string, options:types.options = { useMap: true, }) {
  if (ROUTE_MAP.has(route) && options.useMap) {
    return ROUTE_MAP.get(route);
  } else {
    let keys: PathRegExp.Key[] | never[] | undefined = [];
    //@ts-ignore
    let result:RegExp = new PathRegExp(route, keys) as RegExp;
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
export function findMatchingRoutePath(routes:types.routes, location:string, options:types.options = {}):types.matchingRoute|undefined {
  const { return_matching_keys, } = options;
  let matching:undefined|any;
  let params:undefined|any;
  let re;
  location = (/\?[^\s]+$/.test(location)) ? location.replace(/^([^\s\?]+)\?[^\s]+$/, '$1') : location;
  const routeArray:string[] = Array.isArray(routes) ? routes : Object.keys(routes);
  routeArray.forEach(function(key){
    var result = getParameterizedPath(key, options);
    if (result.re.test(location) && !matching) {
      matching = key;
      re = result.re;
      if (return_matching_keys) {
        const matchingParams: string[] | null = result.re.exec(matching);
        const matchingVals: string[] | null = location.match(result.re);
        if (matchingVals && matchingParams) {
          params = matchingVals.reduce((result:types.routeParams, val, idx) => { 
            if (idx !== 0 && typeof val === 'string') result[ matchingParams[ idx ].replace(':','') ] = val;
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
