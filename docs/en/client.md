# Client

On the client side things are similar, but simplier. In the entry point of the client side app 
(`app/index.js`) we also need to manage the possible presence possible presence of a 
[RouteResolver object](http://mithril.js.org/route.html#advanced-component-resolution) as main component, and 
consequently its `onmatch()` and/or `render()` methods:

```javascript
const m = require('mithril');
const routes = require('./routes.js');

const sharedState = window.__preloadedState || {};

const clientRoutes = {};

Object.keys(routes).forEach((route) => {
    clientRoutes[route] = {
        onmatch: (args, requestedPath) => routes[route].onmatch ? routes[route].onmatch(attrs, requestedPath) : routes[route],
        render: vnode => vnode
    };
});
```

The last step is to mount our client side SPA in the document body:

```javascript
m.route.prefix('');
m.route(document.body, '/', clientRoutes);
```

It's important to change *Mithril*'s default routing strategy to match it with the one used by *Express*. Using 
`m.route.prefix` we [change the router prefix](http://mithril.js.org/route.html#changing-router-prefix) from `#!` 
(hashbang strategy - default) to `''` (pathname strategy).