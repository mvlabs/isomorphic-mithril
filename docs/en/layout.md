# Layout

Before digging into how our main components are built, let's take a look at the *Layout* component we will use to wrap 
the content of our `view` functions with a consistent template structure (header, main content and footer). 

This is one of the few points in the app where, for convenience, we won't fully separate server and client code (server 
side code is contained in the `app/server` folder and will not be included in the bundled SPA package). We will instead 
use a single module for both worlds, using a conditional to detect the environment (server or client) and export the 
right object.

Our `app/components/Layout.js` will then look like this:

```javascript
const m = require('mithril');
const t = require('../translate.js');

const setHead = (vnode) => {
    const head = {};
    head.title = (vnode.attrs.title || '[MISSING TITLE]') + ' · ';
    if (vnode.attrs.slug === 'index') head.title = '';
    head.title += t('header.title');
    head.description = vnode.attrs.description;
    return head;
};

const LayoutClient = {
    // ...
};

const LayoutServer = {
    // ...
};

module.exports = process.browser ? LayoutClient : LayoutServer;
```

## Client side layout

On the client side, the exported object is quite concise. Since our app will be mounted on the `document.body` of the 
server-side rendered page, we already have the outer HTML markup, so the `view` function only needs to return the 
`vnode.children` passed as argument:

```javascript
const LayoutClient = {
    oncreate: (vnode) => {
        const head = setHead(vnode);
        document.title = head.title;
        $('meta[name=description]').replaceWith( '<meta name="description" content="' + head.description + '">' );
    },

    view: vnode => vnode.children
};
```

We use *Mithril*'s `oncreate` []lifecycle method](http://mithril.js.org/hyperscript.html#lifecycle-methods) to set the 
page's title and metadata after the generated DOM is appended to the body.


## Server side layout

On the server side, we need to build from scratch the full HTML markup before passing it to 
[mithril-node-render](https://github.com/StephanHoyer/mithril-node-render) before, and as resulting string then to 
*Express* `res.send` function.

```javascript
const LayoutServer = {
    oninit: vnode => {
        vnode.state.head = setHead(vnode);
    },

    view: vnode => [
        m('!doctype[html]'),
        m('html', {lang: vnode.attrs.globals.activeLanguage || 'en'}, [
            m('head', [
                m('meta', {charset: 'utf-8'}),
                m('meta', {name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'}),
                m('meta', {'http-equiv': 'x-ua-compatible', content: 'ie=edge'}),
                m('title', vnode.state.head.title),
                m('meta', {name: 'description', content: vnode.state.head.description}),
                m('link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans'}),
                m('link', {rel: 'stylesheet', href: `/assets/css/styles.min.css`}),
                m('link', {rel: 'shortcut icon', href: '/assets/img/favicon.ico'})
            ]),
            m('body', [
                vnode.children,
                m('script', `window.__preloadedState = ${vnode.attrs.stateman._getString()}`),
                m('script', {src: `/assets/js/app.min.js`}),
                m('script', {src: '/assets/js/vendor/jquery-3.1.1.min.js'}),
                m('script', {src: '/assets/js/vendor/tether.min.js'}),
                m('script', {src: '/assets/js/vendor/bootstrap.min.js'})
            ])
        ])
    ]
};
```

You might have noticed this line:

```javascript
m('script', `window.__preloadedState = ${vnode.attrs.stateman._getString()}`),
```

This is how we pass the app shared state to the client, as a stringified object (more details in the dedicated section).