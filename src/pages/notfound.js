import m from 'mithril'
import Footer from '../components/footer'
import Header from '../components/header'
import Wrapper from '../components/wrapper'
import Menu from '../components/menu'
import { distPath } from '../config'

export default {
  oninit: ({ attrs: va, state: vs }) => {
    vs.page = {
      slug: 'notfound'
    }
    vs.error = va.error || {
      status: 404,
      message: 'Not Found'
    }
    vs.errorMessage = vs.error.message === 'Not Found'
      ? va.app.t('error.not_found')
      : '?'
  },

  view: ({ attrs: va, state: vs }) => m(Wrapper, {
    app: va.app
  }, m('.wrap', [
    m(Header, {
      app: va.app,
      page: vs.page
    }),
    m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
      m('.column.is-three-quarters-desktop.content', [
        m('h1', `${va.app.t('error.error')} ${vs.error.status}: ${vs.errorMessage}`),
        m('p.text-center', m('img.img-fluid', {
          src: `${distPath}/${vs.error.status}.jpg`,
          alt: `${vs.error.status} error`
        }))
      ]),
      m(Menu, {
        app: va.app,
        page: vs.page
      })
    ]))),
    m(Footer, {
      app: va.app,
      page: vs.page
    })
  ]))
}
