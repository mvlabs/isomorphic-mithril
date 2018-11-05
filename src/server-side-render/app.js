// SERVER SIDE APP
// ==============================================================

import './browser-mock'
import cookieParser from 'fastify-cookie'
import fastify from 'fastify'
import m from 'mithril'
import path from 'path'
import serveStatic from 'fastify-static'
import toHTML from 'mithril-node-render'
import { login } from './auth'
import toc from './toc'
import translations from './translations'
import user from './user'
import authman from '../authman'
import resources from '../resources'
import routes from '../routes'
import stateman from '../stateman'
// import checkLanguage from '../lib/check-language'
import { getBuildHashes } from '../lib/hash'
import i18n from '../lib/i18n'

const port = process.env.PORT || 3000

getBuildHashes()
  .then(hashes => {
    const app = fastify()

    // Cookies
    app.register(cookieParser, err => {
      if (err) throw err
    })

    // Static content
    app.register((instance, opts, next) => {
      instance.register(serveStatic, {
        root: path.join(__dirname, '../../dist'),
        prefix: '/dist/'
      })
      next()
    })
    app.register((instance, opts, next) => {
      instance.register(serveStatic, {
        root: path.join(__dirname, '../../docs'),
        prefix: '/docs/'
      })
      next()
    })

    // Redirect to the default language
    app.get('/', (req, res) => { res.redirect('/en/') })

    // Build Express routes mapping Mithril routes
    Object.keys(routes).forEach(route => {
      app.get(route, (req, res) => {
        const module = routes[route]
        const onmatch = module.onmatch || (() => module)
        const render = module.render || (a => a)

        const activeLanguage = req.activeLanguage || 'en'
        const sections = toc[activeLanguage]

        // Istantiate a new app at every request
        const auth = authman(req.cookies)
        const state = stateman({
          activeLanguage,
          hashes,
          sections
        })
        const fetcher = resources(activeLanguage, auth)
        const t = i18n(translations[activeLanguage])

        const attrs = Object.assign({}, req.params, req.query, {
          app: {
            activeLanguage,
            auth,
            fetcher,
            res,
            state,
            t,
            url: req.raw.url
          }
        })

        Promise.resolve()
          .then(() => m(onmatch(attrs, req.raw.url) || 'div', attrs))
          .then(render)
          .then(toHTML)
          .then(html => res.type('text/html').send(html))
          // .catch(next)
      })
    })

    // API
    app.post('/api/auth', login)
    // app.get('/api/user', serverAuth.check)
    app.get('/api/user', user)

    // Error handling
    app.setNotFoundHandler((req, res) => {
      res.redirect('/en/') // TODO render 404 page
    })

    app.listen(port, '0.0.0.0', err => {
      if (err) throw err
      console.log('\x1b[35m%s\x1b[0m', `[SSR] Listening on localhost:${port}...`)
    })
  })
