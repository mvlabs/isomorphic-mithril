import auth from './auth.js'
import marked from 'marked'
import request from './request.js'

const port = process.env.PORT || 3000
const localUrl = window.location.protocol + '//' + (process.browser ? window.location.host : '127.0.0.1:' + port)
const localData = localUrl + '/docs'
let activeLanguage

const manageErrors = (err) => {
  // console.log('Request error: ', err);
  return Promise.reject(err)
}

export default {
  init: (lang, cookies) => {
    activeLanguage = lang || 'en'
    if (cookies) auth.setCookies(cookies)
  },

  getProtectedContent: () => request.get(`${localData}/${activeLanguage}/toc.json`)
    .then(data => data)
    .catch(manageErrors),

  getSection: section => request.get(`${localData}/${activeLanguage}/${section}.md`, { deserialize: value => value })
    .then(data => marked(data, {
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    }))
    .catch(manageErrors),

  getSections: () => request.get(`${localData}/${activeLanguage}/toc.json`)
    .then(data => data)
    .catch(manageErrors),

  getTranslations: () => request.get(`${localData}/i18n/${activeLanguage}.json`)
    .then(data => data)
    .catch(manageErrors),

  getUserData: () => {
    const userAuthToken = auth.getUserAuthToken() || null
    return request.get(`${localUrl}/api/user`, { headers: { 'user-auth-token': userAuthToken } })
      .then(data => data)
      .catch(manageErrors)
  },

  login: (email, password) => request.post(`${localUrl}/api/auth`, { email, password })
    .then(data => {
      const expires = new Date(data.time * 1000)
      auth.setUserAuthToken(data.token, expires)
      return data
    })
    .catch(manageErrors),

  logout: () => auth.logout(),

  isAuth: () => auth.isAuth()
}
