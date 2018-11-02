# Routing

As disclosed in the introduction, the first aim when building an isomorphic web application is to have shared routes 
between the server and the client. We want a unique set of routes mapping URI patterns to route handlers. Our route 
handlers need to be able to access HTTP headers, cookies, and URI information, and specify redirects without directly 
accessing window.location (browser) or req and res (Node.js). Fortunatly, 
[*Express*](http://expressjs.com/en/guide/routing.html) on the server side and 
[*Mithril*](http://mithril.js.org/route.html) (setting the pathname strategy) on the client side both use the same kind 
of route definition.

We create a module (`app/routes.js`) containing all the routes and the corresponding Mithril base components, which are 
simply objects with a controller and a view functions (more on this later).

```javascript
// Mithril base components
const Home = require('./pages/Home.js');
const NotFound = require('./pages/NotFound.js');
const Section = require('./pages/Section.js');
// ...

// Plain routes (without language prefix)
const plainRoutes = {
    '/': Home,
    '/sections/:key': Section,
    // ...
    '/:other': NotFound
};

module.exports = plainRoutes;
```

We can now use our common set of routes on both server and client side.
