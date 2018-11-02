import cookie from 'js-cookie'

let cookies = {}

const auth = {
  setCookies: (data) => {
    cookies = data
  },

  getUserAuthToken: () => {
    let token
    if (process.browser) {
      token = cookie.get('user-auth-token')
    } else if (cookies['user-auth-token']) {
      token = cookies['user-auth-token']
    }
    return token || null
  },

  setUserAuthToken: (token, expires) => {
    if (process.browser) {
      cookie.set('user-auth-token', token, { expires: expires })
    } else {
      cookies['user-auth-token'] = token
    }
  },

  getUserInfo: () => {
    let token
    if (process.browser) {
      token = cookie.get('user-info-name')
    } else if (cookies['user-info-name']) {
      token = cookies['user-info-name']
    }
    return token
  },

  setUserInfo: (name) => {
    if (process.browser) {
      cookie.set('user-info-name', name)
    } else {
      cookies['user-info-name'] = name
    }
  },

  isAuth: () => {
    const userAuthToken = auth.getUserAuthToken()
    return userAuthToken !== null
  },

  logout: () => {
    cookie.remove('user-auth-token')
    cookie.remove('user-info-name')
    location.replace('/')
  }
}

export default auth
