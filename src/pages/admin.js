import m from 'mithril'
import componentInit from '../componentInit.js'
import Footer from '../components/footer.js'
import Header from '../components/header.js'
import Layout from '../components/layout.js'
import LoadingDots from '../components/loading-dots.js'
import Menu from '../components/menu.js'
import t from '../translate.js'

export default {
  oninit: ({ attrs: va, state: vs }) => new Promise((resolve) => {
    vs.vm = componentInit(va)
    vs.vm.slug = 'admin'
    vs.vm.title = t('admin.admin')
    const statePrefix = 'admin'

    if (!vs.vm.stateman.get(statePrefix + '.userData')) {
      vs.loading = true
      vs.vm.fetcher.getUserData()
        .then((data) => {
          vs.vm.userData = data
          vs.vm.stateman.set(statePrefix + '.userData', data)
          vs.loading = false
          m.redraw()
          resolve()
        })
        .catch((err) => {
          vs.vm.error = err
          m.redraw()
          resolve()
        })
    } else {
      vs.vm.userData = vs.vm.stateman.get(statePrefix + '.userData')
      resolve()
    }
  }),

  view: ({ attrs: va, state: vs }) => m(Layout, vs.vm, m('.wrap', [
    m(Header, vs.vm),
    m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
      m('.column.is-three-quarters-desktop.content', [
        m('h1', t('admin.admin')),
        vs.vm.error ? m('.alert.alert-warning', [
          t('admin.not_authorized') + '. ',
          m('a', {
            href: '/' + vs.vm.globals.activeLanguage + '/login',
            oncreate: m.route.link
          }, t('login.login'))
        ]) : vs.loading ? m(LoadingDots) : [
          m('p', [
            t('admin.welcome_back') + ', ',
            m('strong', vs.vm.userData.name.title + ' ' + vs.vm.userData.name.first + ' ' + vs.vm.userData.name.last),
            '. ',
            m('button.button.is-small', {
              onclick: vs.vm.fetcher.logout
            }, t('login.logout'))
          ]),
          m('table.table', [
            m('tr', [
              m('th', 'profile picture'),
              m('td', m('img', {
                src: vs.vm.userData.picture.large
              }))
            ]),
            m('tr', [
              m('th', 'first name'),
              m('td', vs.vm.userData.name.first)
            ]),
            m('tr', [
              m('th', 'last name'),
              m('td', vs.vm.userData.name.last)
            ]),
            m('tr', [
              m('th', 'location'),
              m('td', [
                vs.vm.userData.location.street + ', ' + vs.vm.userData.location.postcode + ' ' + vs.vm.userData.location.city + ', ' + vs.vm.userData.location.state
              ])
            ]),
            m('tr', [
              m('th', 'nationality'),
              m('td', 'US')
            ]),
            m('tr', [
              m('th', 'email'),
              m('td', vs.vm.userData.email)
            ]),
            m('tr', [
              m('th', 'phone'),
              m('td', vs.vm.userData.phone)
            ]),
            m('tr', [
              m('th', 'cell'),
              m('td', vs.vm.userData.cell)
            ])
          ])
        ]
      ]),
      m(Menu, vs.vm)
    ]))),
    m(Footer, vs.vm)
  ]))
}
