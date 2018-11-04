import auth from './auth'
import { siteURL } from './config'
import request from './lib/request'

const docsUrl = `${siteURL}/docs`

const manageErrors = err => {
  // console.log('Request error: ', err);
  return Promise.reject(err)
}

const resources = (activeLanguage = 'en', cookies) => {
  if (cookies) auth.setCookies(cookies)

  return ({
    getSection: section => request.get(`${docsUrl}/${activeLanguage}/${section}.md`, { deserialize: value => value })
      .catch(manageErrors),

    getSections: () => request.get(`${docsUrl}/${activeLanguage}/toc.json`)
      .then(data => data)
      .catch(manageErrors),

    getTranslations: () => request.get(`${docsUrl}/i18n/${activeLanguage}.json`)
      .then(data => data)
      .catch(manageErrors),

    getUserData: () => {
      const userAuthToken = auth.getUserAuthToken() || null
      return request.get(`${siteURL}/api/user`, { headers: { 'user-auth-token': userAuthToken } })
        .then(data => data)
        .catch(manageErrors)
    },

    login: (email, password) => request.post(`${siteURL}/api/auth`, { email, password })
      .then(data => {
        const expires = new Date(data.time * 1000)
        auth.setUserAuthToken(data.token, expires)
        return data
      })
      .catch(manageErrors),

    logout: () => auth.logout(),

    isAuth: () => auth.isAuth()
  })
}

export default resources
