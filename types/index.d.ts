export type routes = {
  [index: string]: any;
}|string[];

export type options = {
  useMap?: boolean;
  return_matching_keys?: boolean;
}

export type routeParams = {
  [index: string]: any;
}

export type matchingRoute = {
  route: string,
  location: string;
  params: routeParams;
  re: RegExp;
}