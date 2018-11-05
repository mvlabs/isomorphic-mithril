/* global location */
import cookie from 'js-cookie'

const authman = (initialCookies = {}) => {
  const auth = {
    cookies: initialCookies,

    getUserAuthToken: () => {
      let token
      if (process.browser) {
        token = cookie.get('user-auth-token')
      } else if (auth.cookies['user-auth-token']) {
        token = auth.cookies['user-auth-token']
      }
      return token || null
    },

    setUserAuthToken: (token, expires) => {
      if (process.browser) {
        cookie.set('user-auth-token', token, { expires: expires })
      } else {
        auth.cookies['user-auth-token'] = token
      }
    },

    isAuth: () => auth.getUserAuthToken() != null,

    logout: () => {
      cookie.remove('user-auth-token')
      cookie.remove('user-info-name')
      location.replace('/')
    }
  }

  return auth
}

export default authman
