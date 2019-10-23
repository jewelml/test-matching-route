export declare type routes = {
    [index: string]: any;
} | string[];
export declare type options = {
    useMap?: boolean;
    return_matching_keys?: boolean;
};
export declare type routeParams = {
    [index: string]: any;
};
export declare type matchingRoute = {
    route: string;
    location: string;
    params: routeParams;
    re: RegExp;
};
