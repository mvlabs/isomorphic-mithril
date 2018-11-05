import m from 'mithril'
import Layout from '../components/layout'
import Wrapper from '../components/wrapper'
import LoadingDots from '../components/loading-dots'

export default {
  oninit: ({ attrs: va, state: vs }) => new Promise(resolve => {
    vs.page = {
      slug: 'admin',
      title: va.app.t('admin.admin')
    }
    const statePrefix = 'admin'

    vs.userData = va.app.auth.isAuth() && va.app.state.get(`${statePrefix}.userData`)
    if (!vs.userData) {
      vs.loading = true
      va.app.fetcher.getUserData()
        .then(data => {
          vs.userData = data
          va.app.state.set(`${statePrefix}.userData`, data)
          vs.loading = false
          resolve()
        })
        .catch(() => {
          vs.loading = false
          resolve()
        })
    } else {
      resolve()
    }
  }),

  view: ({ attrs: va, state: vs }) => m(Wrapper, {
    app: va.app,
    page: vs.page
  }, m(Layout, {
    app: va.app,
    page: vs.page
  }, [
    m('h1', va.app.t('admin.admin')),
    vs.userData
      ? [
        m('p', [
          `${va.app.t('admin.welcome_back')}, `,
          m('strong', `${vs.userData.name.title} ${vs.userData.name.first} ${vs.userData.name.last}`),
          '. ',
          m('button.button.is-small', {
            onclick: va.app.auth.logout
          }, va.app.t('login.logout'))
        ]),
        m('table.table', [
          m('tr', [
            m('th', 'profile picture'),
            m('td', m('img', {
              src: vs.userData.picture.large
            }))
          ]),
          m('tr', [
            m('th', 'first name'),
            m('td', vs.userData.name.first)
          ]),
          m('tr', [
            m('th', 'last name'),
            m('td', vs.userData.name.last)
          ]),
          m('tr', [
            m('th', 'location'),
            m('td', [
              `${vs.userData.location.street}, ${vs.userData.location.postcode} ${vs.userData.location.city}, ${vs.userData.location.state}`
            ])
          ]),
          m('tr', [
            m('th', 'nationality'),
            m('td', 'US')
          ]),
          m('tr', [
            m('th', 'email'),
            m('td', vs.userData.email)
          ]),
          m('tr', [
            m('th', 'phone'),
            m('td', vs.userData.phone)
          ]),
          m('tr', [
            m('th', 'cell'),
            m('td', vs.userData.cell)
          ])
        ])
      ]
      : vs.loading
        ? m(LoadingDots)
        : m('.alert.alert-warning', [
          `${va.app.t('admin.not_authorized')}. `,
          m('a', {
            href: `/${va.app.activeLanguage}/login`,
            oncreate: m.route.link
          }, va.app.t('login.login'))
        ])
  ]))
}
