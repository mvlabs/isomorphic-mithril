// CLIENT SIDE APP
// ==============================================================

const m = require('mithril');
const routes = require('./routes.js');
const stateManager = require('./stateman.js');
const resources = require('./resources.js');
const store = require('store');
const t = require('./translate.js');

const sharedState = window.__preloadedState || {};

// Get app state from server shared state and local storage
const globalsFromStore = store.get('globals') || {};
const stateman = Object.create(stateManager);
stateman.init(Object.assign({}, sharedState, globalsFromStore));
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
