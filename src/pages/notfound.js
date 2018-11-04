import m from 'mithril'
import Footer from '../components/footer'
import Header from '../components/header'
import Wrapper from '../components/wrapper'
import Menu from '../components/menu'
import t from '../lib/translate'
import { distPath } from '../config'

export default {
  oninit: ({ attrs: va, state: vs }) => {
    vs.slug = 'notfound'
    vs.error = va.error || {
      status: 404,
      message: 'Not Found'
    }
    vs.errorMessage = vs.error.message === 'Not Found'
      ? t('error.not_found')
      : '?'
  },

  view: ({ attrs: va, state: vs }) => m(Wrapper, {
    app: va.app
  }, m('.wrap', [
    m(Header, {
      app: va.app,
      slug: vs.slug
    }),
    m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
      m('.column.is-three-quarters-desktop.content', [
        m('h1', `${t('error.error')} ${vs.error.status}: ${vs.errorMessage}`),
        m('p.text-center', m('img.img-fluid', {
          src: `${distPath}/${vs.error.status}.jpg`,
          alt: `${vs.error.status} error`
        }))
      ]),
      m(Menu, {
        app: va.app,
        slug: vs.slug
      })
    ]))),
    m(Footer, {
      app: va.app,
      slug: vs.slug
    })
  ]))
}
