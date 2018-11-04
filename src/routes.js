// ROUTES
// ==============================================================

import languages from '../docs/languages.json'

// Mithril base components
import Admin from './pages/admin'
import Home from './pages/home'
import Login from './pages/login'
import NotFound from './pages/notfound'
import Section from './pages/section'

// List of allowed languages
const allowedLanguages = languages.map(language => language.slug)

// Plain routes (without language prefix)
const plainRoutes = {
  '/': Home,
  '/admin': Admin,
  '/login': Login,
  '/sections/:key': Section,
  '/:other': NotFound
}

// Build the complete routes tree for all the languages
const routes = {}
routes['/'] = Home
allowedLanguages.map((language) => {
  Object.keys(plainRoutes).forEach((route) => {
    routes['/' + language + route] = plainRoutes[route]
  })
})
// Template for 404 errors
routes['/:other'] = NotFound

export default routes
