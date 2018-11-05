import languages from '../../docs/languages.json'

// Middleware to check languages
const checkLanguage = (req, res, next) => {
  const lang = req.url.substr(1, 2)
  const allowedLanguages = languages.map(language => language.slug)
  if (allowedLanguages.includes(lang)) {
    req.activeLanguage = lang
    if (req.url.length === 3) {
      res.redirect(`${req.url}/`)
    } else {
      next()
    }
  } else {
    req.activeLanguage = 'en'
    next()
  }
}

export default checkLanguage
