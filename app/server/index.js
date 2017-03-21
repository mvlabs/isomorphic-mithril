// SERVER SIDE APP
// ==============================================================

const auth = require('./auth.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const hash = require('./../../stats.json').hash;
const m = require('mithril');
const moment = require('moment');
const logger = require('morgan');
const resources = require('../resources.js');
const routes = require('../routes.js');
const stateManager = require('../stateman.js');
const t = require('../translate.js');
const toHTML = require('mithril-node-render');
const user = require('./user.js');
const utils = require('./utils.js');

const env = process.env.NODE_ENV || 'dev';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));

// Serve static assets via Express
app.use('/docs', express.static(__dirname + '/../../docs'));
app.use('/assets', express.static(__dirname + '/../../assets'));

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
                dateFormat: moment.localeData().longDateFormat('L') || 'DD/MM/YYYY',
                activeLanguage: activeLanguage
            },
            hash,
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

// API
app.post('/api/auth', auth.login);
app.get('/api/user', auth.check, user);

module.exports = app;