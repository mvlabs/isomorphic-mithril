// UTILITIES
// ==============================================================

const languages = require('../../docs/languages.json');


const utils = {};

// Middleware to check languages
utils.checkLanguage = (req, res, next) => {
    const lang = req.url.substr(1, 2);
    const allowedLanguages = languages.map(language => language.slug)
        .filter(language => ['en', 'it'].includes(language)); // TODO: temp, remove to use all available languages
    if (allowedLanguages.includes(lang)) {
        req.activeLanguage = lang;
        if (req.url.length === 3) {
            res.redirect(req.url + '/');
        } else {
            next();
        }
    } else {
        req.activeLanguage = 'en';
        next();
    }
};

module.exports = utils;