import m from 'mithril'
import componentInit from '../componentInit.js'
import Footer from '../components/footer'
import Header from '../components/header'
import Layout from '../components/layout'
import Menu from '../components/menu'
import t from '../translate.js'

export default {
  oninit: ({ attrs: va, state: vs }) => {
    vs.vm = componentInit(va)
    vs.vm.section.slug = 'notfound'
    vs.vm.error = va.error || {
      status: 404,
      message: 'Not Found'
    }
    vs.errorMessage = vs.vm.error.message === 'Not Found' ? t('error.not_found') : '?'
  },

  view: ({ attrs: va, state: vs }) => m(Layout, vs.vm, m('.wrap', [
    m(Header, vs.vm),
    m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
      m('.column.is-three-quarters-desktop.content', [
        m('h1', t('error.error') + ' ' + vs.vm.error.status + ': ' + vs.errorMessage),
        m('p.text-center', m('img.img-fluid', {
          src: `/assets/img/${vs.vm.error.status}.jpg`,
          alt: `${vs.vm.error.status} error`
        }))
      ]),
      m(Menu, vs.vm)
    ]))),
    m(Footer, vs.vm)
  ]))
}
