// ROUTES
// ==============================================================

const languages = require('../docs/languages.json');
// Mithril base components
const Admin = require('./pages/Admin.js');
const Home = require('./pages/Home.js');
const Login = require('./pages/Login.js');
const NotFound = require('./pages/NotFound.js');
const Section = require('./pages/Section.js');


// List of allowed languages
const allowedLanguages = languages.map(language => language.slug);

// Plain routes (without language prefix)
const plainRoutes = {
    '/': Home,
    '/admin': Admin,
    '/login': Login,
    '/sections/:key': Section,
    '/:other': NotFound
};


// Build the complete routes tree for all the languages
const routes = {};
routes['/'] = Home;
allowedLanguages.map((language) => {
    Object.keys(plainRoutes).forEach((route) => {
        routes['/' + language + route] = plainRoutes[route];
    });
});
// Template for 404 errors
routes['/:other'] = NotFound;


module.exports = routes;
