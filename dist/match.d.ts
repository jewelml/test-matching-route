import * as types from './types';
export declare const ROUTE_MAP: Map<any, any>;
/**
 * Generates a express style regexp for a given route and stores in a Map
 * @param  {string} route The route that should be converted into a regexp
 * @return {Object}       Returns an object with param keys and a path regexp
 */
export declare function getParameterizedPath(route: string, options?: types.options): any;
/**
 * Finds a matching dynamic route from manifest
 * @param  {Object|Array} routes   The manifest configuration object
 * @param  {string} location The window location that should be resolved
 * @return {string}          A matching dynamic route
 */
export declare function findMatchingRoutePath(routes: types.routes, location: string, options?: types.options): types.matchingRoute | undefined;
