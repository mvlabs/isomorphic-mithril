// CLIENT SIDE APP
// ==============================================================

import m from 'mithril'

import authman from './authman'
import routes from './routes'
import stateman from './stateman'
import resources from './resources'
import { decode } from './lib/decode-markdown'
import i18n from './lib/i18n'
// Styles
import './scss/style.scss'
// Static assets
import './assets'

// Get state from server shared state
const sharedState = window.__sharedState || {}

// Init app
const auth = authman()
const state = stateman(sharedState)
const activeLanguage = state.get('activeLanguage') || 'en'
const fetcher = resources(activeLanguage, auth)

const clientRoutes = {}

// Get sections from state or fetch them
const getSections = () => state.get('sections')
  ? Promise.resolve()
  : fetcher.getSections()
    .then(sections => { state.set('sections', decode(sections)) })

getSections()
  .then(() => fetcher.getTranslations())
  .then(translations => {
    const t = i18n(translations)
    const app = {
      auth,
      activeLanguage,
      fetcher,
      state,
      t
    }
    for (let route in routes) {
      clientRoutes[route] = {
        onmatch: (attrs, requestedPath) => {
          attrs.app = app
          attrs.url = requestedPath
          return routes[route].onmatch
            ? routes[route].onmatch(attrs, requestedPath)
            : routes[route]
        }
      }
    }
  })
  .then(() => {
    // Change the default hashbang route prefix to make server and client routes match
    m.route.prefix('')
    // Mount the SPA in the document body
    m.route(document.body, '/', clientRoutes)
  })
