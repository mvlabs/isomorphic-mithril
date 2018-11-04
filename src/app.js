// CLIENT SIDE APP
// ==============================================================

import m from 'mithril'

import routes from './routes'
import stateManager from './stateman'
import resources from './resources'
import t from './lib/translate'

import './scss/style.scss'
import './img/favicon.ico'
import './img/mv-logo.png'
import './img/flag-en.png'
import './img/flag-it.png'
import './img/404.jpg'

const sharedState = window.__preloadedState || {}

// Get src state from server shared state
const stateman = Object.create(stateManager)
stateman.init(Object.assign({}, sharedState))
const activeLanguage = stateman.get('activeLanguage') || 'en'
const fetcher = Object.create(resources)
fetcher.init(activeLanguage)

const clientRoutes = {}

fetcher.getTranslations()
  .then(messages => {
    t.init(messages)
    return stateman.get('sections')
      ? Promise.resolve()
      : fetcher.getSections()
        .then(sections => { stateman.set('sections', sections) })
  })
  .then(() => {
    const app = { activeLanguage, fetcher, stateman }
    Object.keys(routes).forEach(route => {
      clientRoutes[route] = {
        onmatch: (attrs, requestedPath) => {
          attrs.app = app
          attrs.url = requestedPath
          return routes[route].onmatch
            ? routes[route].onmatch({ app, url: requestedPath }, requestedPath)
            : routes[route]
        }
      }
    })
  })
  .then(() => {
    m.route.prefix('')
    m.route(document.body, '/', clientRoutes)
  })
