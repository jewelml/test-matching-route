import PathRegExp from 'path-to-regexp';

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
  } else {
    var keys = [];
    var result = new PathRegExp(route, keys);
    // console.log({ route, }, {
    //   re: result,
    //   keys,
    // });
    ROUTE_MAP.set(route, {
      re: result,
      keys: keys,
    });
    return { keys:keys, re: result, };
  }
}


/**
 * Finds a matching dynamic route from manifest
 * @param  {Object|Array} routes   The manifest configuration object
 * @param  {string} location The window location that should be resolved
 * @return {string}          A matching dynamic route
 */
function findMatchingRoutePath(routes, location, options = {}) {
  var matching;
  location = (/\?[^\s]+$/.test(location)) ? location.replace(/^([^\s\?]+)\?[^\s]+$/, '$1') : location;
  const routeArray = Array.isArray(routes) ? routes : Object.keys(routes);
  routeArray.forEach(function(key){
    var result = getParameterizedPath(key, options);
    if (result.re.test(location) && !matching) matching = key;
  });
  // console.log({ routes, location, matching, });
  return matching;
}

export { findMatchingRoutePath, getParameterizedPath, ROUTE_MAP };
