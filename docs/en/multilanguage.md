# Multilanguage

Among all the other common requirements of our app, the multilanguage is the most complex, since it requires to 
make changes almost in every main area of our code.


## Supported languages

The first thing we need to do is to define the supported languages (English and Italian to begin) in 
`docs/language.json`:

```json
[
    {
        "id": 1,
        "slug": "en",
        "name": "English",
        "native_name": "English",
        "locale": "en_US"
    },
    {
        "id": 2,
        "slug": "it",
        "name": "Italian",
        "native_name": "Italiano",
        "locale": "it_IT"
    }
]
```


## Routes

We need to modify our routes adding language code prefixes for urls. We generate an array of the ISO 639-1 language 
codes of our supported languages, and we map it to generate our multilanguage routes, replicating all routes for each 
language and prefixing them with the language code (`/en/`, `/it/`, ...).

Our `app/routes.js` will then look like:

```javascript
const languages = require('../docs/languages.json');
// Mithril base components
const Home = require('./pages/Home.js');
const NotFound = require('./pages/NotFound.js');
const Section = require('./pages/Section.js');
// ...


// List of allowed languages
const allowedLanguages = languages.map(language => language.slug);

// Plain routes (without language prefix)
const plainRoutes = {
    '/': Home,
    '/sections/:key': Section,
    // ...
    '/:other': NotFound
};


// Build the complete routes tree for all the languages
const routes = {};
routes['/'] = Home;
allowedLanguages.map((language) => {
    Object.keys(plainRoutes).forEach((route) => {
        routes['/' + language + route] = plainRoutes[route];
    });
});
// Template for 404 errors
routes['/:other'] = NotFound;


module.exports = routes;
```


## Server

The first change we have to do in our `app/server/index.js` is to define a redirect to the default language (English, 
in our case):

```javascript
// Redirect to the default language
app.get('/', (req, res) => {
    res.redirect('/en/');
});
```
We need to define our routes in such a way that we are be able to detect if the requested URLs are matching or not with 
existing contents. We need to check if the first part or the URL matches with a code of our list of supported languages. 
To do that before resolving the components associated with the routes, we add an *Express* middleware in the routes 
definitions (`utils.checkLanguage`) which checks the language prefix and, if valid, passes it down in the *request* as 
`req.activeLanguage` property and, if not, it redirects to `/`.

We can define the active language as

```javascript
const activeLanguage = req.activeLanguage || 'en';
```

and use it to:

- read the right table of contents (`toc.json`);
- initialize the state passing down the active language in it;
- initialize the i18n module to use the right translations file (more on that later);
- initialize the *fetcher* for localized resources.

Our `app/server/index.js` will then look like:

```javascript
const express = require('express');
const m = require('mithril');
const resources = require('../resources.js');
const routes = require('../routes.js');
const stateManager = require('../stateman.js');
const t = require('../translate.js');
const toHTML = require('mithril-node-render');
const utils = require('./utils.js');

const app = express();
const router = express.Router();

// Redirect to the default language
app.get('/', (req, res) => {
    res.redirect('/en/');
});

// Build Express routes mapping Mithril routes
Object.keys(routes).forEach((route) => {

    router.get(route, utils.checkLanguage, (req, res, next) => {
        const module = routes[route];
        const onmatch = module.onmatch || (() => module);
        const render = module.render || (a => a);

        const activeLanguage = req.activeLanguage || 'en';
        const sections = require(`../../docs/${activeLanguage}/toc.json`);

        // Istantiate a new state at every request
        const stateman = Object.create(stateManager);
        stateman.init({
            globals: {
                activeLanguage: activeLanguage
            },
            sections: sections
        });

        const translations = require('../../docs/i18n/' + activeLanguage + '.json');
        t.init(translations);
        const fetcher = Object.create(resources);
        fetcher.init(activeLanguage, req.cookies);

        const attrs = Object.assign({}, req.params, req.query, {fetcher, res, sections, stateman});

        Promise.resolve()
            .then(() => m(onmatch(attrs, req.url) || 'div', attrs))
            .then(render)
            .then(toHTML)
            .then((html) => {
                res.type('html').send(html);
            })
            .catch(next);
    });
});

app.use('/', router);

module.exports = app;
```


## Resources

As previously disclosed, our *resources* module needs to be initialized with the active language to be able to fetch the 
right localized contents.

```javascript
const marked = require('marked');
const request = require('./request.js');

const port = process.env.PORT || 3000;
const localUrl = 'http://' + (process.browser ? window.location.host : '127.0.0.1:' + port);
const localData = localUrl + '/docs';
let activeLanguage;

const manageErrors = (err) => {
    // console.log('Request error: ', err);
    return Promise.reject(err);
};

module.exports = {
    init: (lang) => {
        activeLanguage = lang || 'en';
    },

    getSection: section => request.get(`${localData}/${activeLanguage}/${section}.md`, { deserialize: value => value })
        .then(data => marked(data, {
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        }))
        .catch(manageErrors),

    getSections: () => request.get(`${localData}/${activeLanguage}/toc.json`)
        .then(data => data)
        .catch(manageErrors),
    
    // ...
};
```


## Client

Our SPA entry point also needs to be modified to support multilanguage. On the client we know the active language from 
the shared state from the server, so we define our `activeLanguage` variable as:

```javascript
const activeLanguage = stateman.get('globals.activeLanguage') || 'en';
```

Similar as in the server side counterpart, we also need it to initialize the i18n module and the *fetcher*. Our 
`app/index.js` will then look like:

```javascript
const m = require('mithril');
const routes = require('./routes.js');
const stateManager = require('./stateman.js');
const resources = require('./resources.js');
const t = require('./translate.js');

const sharedState = window.__preloadedState || {};

// Get app state from server shared state
const stateman = Object.create(stateManager);
stateman.init(Object.assign({}, sharedState));
const activeLanguage = stateman.get('globals.activeLanguage') || 'en';
const fetcher = Object.create(resources);
fetcher.init(activeLanguage);

const clientRoutes = {};

fetcher.getTranslations()
    .then((messages) => {
        t.init(messages);
        return stateman.get('sections') || fetcher.getSections();
    })
    .then((sections) => {
        const attrs = {fetcher: fetcher, stateman: stateman, sections: sections};
        Object.keys(routes).forEach((route) => {
            clientRoutes[route] = {
                onmatch: (args, requestedPath) => routes[route].onmatch ? routes[route].onmatch(attrs, requestedPath) : routes[route],
                render: (vnode) => {
                    Object.assign(vnode.attrs, attrs);
                    return vnode;
                }
            };
        });
    })
    .then(() => {
        m.route.prefix('');
        m.route(document.body, '/', clientRoutes);
    });
```


## i18n

In the client side code above you may have noticed that the route mapping is now inside a *Promise* chain. That's 
because now we need to perform an async request and a couple of other operations before mounting the app:

- get the right translations file with `fetcher.getTranslations()`;
- use it to initialize our internationalization library with `t.init(messages)`;
- get the localized table of contents from the state, or fetch it otherwise with 
`stateman.get('sections') || fetcher.getSections()`.

For the internationalization of our app we use Stephan Hoyer's 
**[translate.js](https://github.com/StephanHoyer/translate.js)**, a micro library for translations with support for 
placeholders and multiple plural forms, which also plays very well with VDOM libraries like *Mithril*.

We define our own translation module (`app/translate.js`):

```javascript
const m = require('mithril');
const translatejs = require('translate.js');

const options = {
    debug: true,  //[Boolean]: Logs missing translations to console and add "@@" around output, if `true`.
    array: false,  //[Boolean]: Returns translations with placeholder-replacements as Arrays, if `true`.
    resolveAliases: false  //[Boolean]: Parses all translations for aliases and replaces them, if `true`.
};

let messages = {};

const translate = (key, args) => {
    const t = translatejs(messages, options);
    return args ? m.trust(t(key, args)) : t(key);
};

translate.init = (data) => {
    if (data) messages = data;
};

translate.getTranslations = () => messages;

module.exports = translate;
```

We define one key-value translation file per language in JSON format (i.e. `docs/i18n/en.json`), which will look like:

```json
{
    "header.title": "Isomorphic JS with Mithril",
    "sidebar.toc": "Table of contents",
    ...
}
```

and then we translate the strings simply calling the `t` helper:

```javascript
t('header.title') // returns 'Isomorphic JS with Mithril' for 'en' active language
```