# Class

# Function

## `getParameterizedPath(route: string): Object`

Generates a express style regexp for a given route and stores in a Map

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| route | string |  | The route that should be converted into a regexp |

## `findMatchingRoutePath(routes: Object|Array, location: string): string`

Finds a matching dynamic route from manifest

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| routes | Object|Array |  | The manifest configuration object |
| location | string |  | The window location that should be resolved |