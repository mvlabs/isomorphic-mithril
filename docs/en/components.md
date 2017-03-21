# Components

Our **main components** (or first level components, located in `app/components/pages`) are the ones mapped with the 
routes. They are plain [*Mithril* components](http://mithril.js.org/hyperscript.html#components), Javascript objects 
that contain a `view` method (the function that renders a virtual DOM vnode into a real DOM element) 
and other optional [lifecycle methods](http://mithril.js.org/hyperscript.html#lifecycle-methods), among which the most 
important is the `oninit`, which can be considered as the `controller` of our component (it is run only once and before 
the `view` is rendered).

Our typical main component will look like this:

```javascript
const m = require('mithril');
const Footer = require('../components/Footer.js');
const Header = require('../components/Header.js');
const LoadingDots = require('../components/LoadingDots.js');
const Layout = require('../components/Layout.js');
const NotFound = require('./NotFound.js');
const resources = require('../resources.js');

module.exports = {
    oninit: vnode => new Promise((resolve) => {
        vnode.state.loading = true;
        resources.getSomething() // any async data fetching
            .then((content) => {
                vnode.state.content = content;
                vnode.state.loading = false;
                m.redraw();
                resolve();
            })
            .catch((err) => {
                vnode.state.error = err;
                m.redraw();
                resolve();
            });
    }),

    view: vnode => vnode.state.error ? m(NotFound) : m(Layout, [
        m(Header),
        m('main', [
            vnode.state.loading ? m(LoadingDots) : vnode.state.content
        ]),
        m(Footer)
    ])
};
```

In the `oninit` function we will typically need to async fetch remote content data: in this simplified example we are 
passing down the fetched data to the `view` via `vnode.state`, component's 
[vnode internal state](http://mithril.js.org/components.html#state). In the `view` we pass it down to the `Layout` 
component as argument, inside the entire `vnode` tree of the page (together with the `Header` and the `Footer`); 
otherwise, in case of errors, we are going to render a different component (`Error` - more on this later).

## Blocking vs non-blocking data flow

Since the rendering sequences for server-side web and client-side web are different (the first is blocking, the second 
is async), we need to set a slightly different behaviour in the corresponding code.

On the server side, *Express* needs to know when all our async operations in the `oninit` are done before proceeding with 
the rendering of the resulting `view`. We build then our main components as **async components**: the `oninit` function 
is returning a *Promise*, and we just have to resolve it by calling `resolve()` when our async calls are complete 
(successfully or not).

On the client side, the `view` function runs for the first time before the async fetch is completed, showing a loading 
animation as default (the `vnode.state.loading` *loading flag* is set to `true`). Same as before, when the async calls 
are completed, we set the *loading flag* as `false` and we finally call *Mithril*'s `m.redraw()` to manually
[trigger a DOM redraw](http://mithril.js.org/redraw.html).