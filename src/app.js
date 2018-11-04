// CLIENT SIDE APP
// ==============================================================

import m from 'mithril'

import routes from './routes'
import stateman from './stateman'
import resources from './resources'
import { decode } from './lib/decode-markdown'
import i18n from './lib/i18n'
// Styles
import './scss/style.scss'
// Static assets
import './assets'

const sharedState = window.__preloadedState || {}

// Get src state from server shared state
const state = stateman(Object.assign({}, sharedState))
const activeLanguage = state.get('activeLanguage') || 'en'
const fetcher = resources(activeLanguage)

const clientRoutes = {}

const getSections = () => state.get('sections')
  ? Promise.resolve()
  : fetcher.getSections()
    .then(sections => { state.set('sections', decode(sections)) })

getSections()
  .then(() => fetcher.getTranslations())
  .then(translations => {
    const t = i18n(translations)
    const app = { activeLanguage, fetcher, state, t }
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
