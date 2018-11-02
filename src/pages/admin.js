import m from 'mithril'
import componentInit from '../componentInit.js'
import Footer from '../components/footer.js'
import Header from '../components/header.js'
import Layout from '../components/layout.js'
import LoadingDots from '../components/loading-dots.js'
import Menu from '../components/menu.js'
import t from '../translate.js'

let vm

export default {
  oninit: vnode => new Promise((resolve) => {
    vm = componentInit(vnode)
    vm.slug = 'admin'
    vm.title = t('admin.admin')
    const statePrefix = 'admin'

    if (!vm.stateman.get(statePrefix + '.userData')) {
      vnode.state.loading = true
      vm.fetcher.getUserData()
        .then((data) => {
          vm.userData = data
          vm.stateman.set(statePrefix + '.userData', data)
          vnode.state.loading = false
          m.redraw()
          resolve()
        })
        .catch((err) => {
          vm.error = err
          m.redraw()
          resolve()
        })
    } else {
      vm.userData = vm.stateman.get(statePrefix + '.userData')
      resolve()
    }
  }),

  view: vnode => m(Layout, vm, m('.wrap', [
    m(Header, vm),
    m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
      m('.column.is-three-quarters-desktop.content', [
        m('h1', t('admin.admin')),
        vm.error ? m('.alert.alert-warning', [
          t('admin.not_authorized') + '. ',
          m('a', {
            href: '/' + vm.globals.activeLanguage + '/login',
            oncreate: m.route.link
          }, t('login.login'))
        ]) : vnode.state.loading ? m(LoadingDots) : [
          m('p', [
            t('admin.welcome_back') + ', ',
            m('strong', vm.userData.name.title + ' ' + vm.userData.name.first + ' ' + vm.userData.name.last),
            '. ',
            m('button.button.is-small', {
              onclick: vm.fetcher.logout
            }, t('login.logout'))
          ]),
          m('table.table', [
            m('tr', [
              m('th', 'profile picture'),
              m('td', m('img', {
                src: vm.userData.picture.large
              }))
            ]),
            m('tr', [
              m('th', 'first name'),
              m('td', vm.userData.name.first)
            ]),
            m('tr', [
              m('th', 'last name'),
              m('td', vm.userData.name.last)
            ]),
            m('tr', [
              m('th', 'location'),
              m('td', [
                vm.userData.location.street + ', ' + vm.userData.location.postcode + ' ' + vm.userData.location.city + ', ' + vm.userData.location.state
              ])
            ]),
            m('tr', [
              m('th', 'nationality'),
              m('td', 'US')
            ]),
            m('tr', [
              m('th', 'email'),
              m('td', vm.userData.email)
            ]),
            m('tr', [
              m('th', 'phone'),
              m('td', vm.userData.phone)
            ]),
            m('tr', [
              m('th', 'cell'),
              m('td', vm.userData.cell)
            ])
          ])
        ]
      ]),
      m(Menu, vm)
    ]))),
    m(Footer, vm)
  ]))
}
