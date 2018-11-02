// SERVER SIDE APP
// ==============================================================

import './server-mock'
import auth from './auth'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import m from 'mithril'
import resources from '../resources'
import routes from '../routes'
import stateManager from '../stateman'
import t from '../translate.js'
import toHTML from 'mithril-node-render'
import user from './user'
import checkLanguage from '../lib/check-language'
import { getBuildHashes } from '../lib/hash'

const port = process.env.PORT || 3000

getBuildHashes()
  .then(hashes => {
    const app = express()
    const router = express.Router()

    app.use(bodyParser.json())
    app.use(cors())
    app.use(cookieParser())

    // Serve static assets via Express
    app.use('/docs', express.static(__dirname + '/../../docs'))
    app.use('/dist', express.static(__dirname + '/../../dist'))

    // Redirect to the default language
    app.get('/', (req, res) => {
      res.redirect('/en/')
    })

    // Build Express routes mapping Mithril routes
    Object.keys(routes).forEach((route) => {
      router.get(route, checkLanguage, (req, res, next) => {
        const module = routes[route]
        const onmatch = module.onmatch || (() => module)
        const render = module.render || (a => a)

        const activeLanguage = req.activeLanguage || 'en'
        const sections = require(`../../docs/${activeLanguage}/toc.json`)

        // Istantiate a new state at every request
        const stateman = Object.create(stateManager)
        stateman.init({
          globals: {
            activeLanguage: activeLanguage
          },
          hashes,
          sections: sections
        })

        const translations = require('../../docs/i18n/' + activeLanguage + '.json')
        t.init(translations)
        const fetcher = Object.create(resources)
        fetcher.init(activeLanguage, req.cookies)

        const attrs = Object.assign({}, req.params, req.query, { fetcher, res, sections, stateman })

        Promise.resolve()
          .then(() => m(onmatch(attrs, req.url) || 'div', attrs))
          .then(render)
          .then(toHTML)
          .then((html) => {
            res.type('html').send(html)
          })
          .catch(next)
      })
    })

    app.use('/', router)

    // API
    app.post('/api/auth', auth.login)
    app.get('/api/user', auth.check, user)

    app.listen(port, () => {
      console.log('Listening on localhost:' + port + '...')
    })
  })
