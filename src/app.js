// CLIENT SIDE APP
// ==============================================================

import m from 'mithril'

import routes from './routes.js'
import stateManager from './stateman.js'
import resources from './resources.js'
import store from 'store'
import t from './translate.js'

import './scss/style.scss'
import './img/favicon.ico'
import './img/mv-logo.png'
import './img/flag-en.png'
import './img/flag-it.png'
import './img/404.jpg'

const sharedState = window.__preloadedState || {}

// Get src state from server shared state and local storage
const globalsFromStore = store.get('globals') || {}
const stateman = Object.create(stateManager)
stateman.init(Object.assign({}, sharedState, globalsFromStore))
const activeLanguage = stateman.get('globals.activeLanguage') || 'en'
const fetcher = Object.create(resources)
fetcher.init(activeLanguage)

const clientRoutes = {}

fetcher.getTranslations()
  .then((messages) => {
    t.init(messages)
    return stateman.get('sections') || fetcher.getSections()
  })
  .then((sections) => {
    const attrs = { fetcher: fetcher, stateman: stateman, sections: sections }
    Object.keys(routes).forEach((route) => {
      clientRoutes[route] = {
        onmatch: (args, requestedPath) => routes[route].onmatch ? routes[route].onmatch(attrs, requestedPath) : routes[route],
        render: (vnode) => {
          Object.assign(vnode.attrs, attrs)
          return vnode
        }
      }
    })
  })
  .then(() => {
    m.route.prefix('')
    m.route(document.body, '/', clientRoutes)
  })
