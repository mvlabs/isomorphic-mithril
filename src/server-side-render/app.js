// SERVER SIDE APP
// ==============================================================

import './browser-mock'
import auth from './auth'
import bodyParser from 'body-parser'
import checkLanguage from '../lib/check-language'
import cookieParser from 'cookie-parser'
import express from 'express'
import { getBuildHashes } from '../lib/hash'
import m from 'mithril'
import path from 'path'
import resources from '../resources'
import routes from '../routes'
import stateman from '../stateman'
import i18n from '../lib/i18n'
import toHTML from 'mithril-node-render'
import user from './user'
import toc from './toc'
import translations from './translations'

const port = process.env.PORT || 3000

getBuildHashes()
  .then(hashes => {
    const app = express()
    const router = express.Router()

    app.use(bodyParser.json())
    app.use(cookieParser())

    // Serve static assets via Express
    app.use('/docs', express.static(path.join(__dirname, '../../docs')))
    app.use('/dist', express.static(path.join(__dirname, '../../dist')))

    // Redirect to the default language
    app.get('/', (req, res) => res.redirect('/en/'))

    // Build Express routes mapping Mithril routes
    Object.keys(routes).forEach(route => {
      router.get(route, checkLanguage, (req, res, next) => {
        const module = routes[route]
        const onmatch = module.onmatch || (() => module)
        const render = module.render || (a => a)

        const activeLanguage = req.activeLanguage || 'en'
        const sections = toc[activeLanguage]

        // Istantiate a new state at every request
        const state = stateman({
          activeLanguage,
          hashes,
          sections
        })
        const fetcher = Object.create(resources)
        fetcher.init(activeLanguage, req.cookies)
        const t = i18n(translations[activeLanguage])

        const attrs = Object.assign({}, req.params, req.query, {
          app: { activeLanguage, fetcher, res, state, t, url: req.url }
        })

        Promise.resolve()
          .then(() => m(onmatch(attrs, req.url) || 'div', attrs))
          .then(render)
          .then(toHTML)
          .then(html => res.type('html').send(html))
          .catch(next)
      })
    })

    app.use('/', router)

    // API
    app.post('/api/auth', auth.login)
    app.get('/api/user', auth.check, user)

    app.listen(port, () => {
      console.log('\x1b[35m%s\x1b[0m', `[SSR] Listening on localhost:${port}...`)
    })
  })
