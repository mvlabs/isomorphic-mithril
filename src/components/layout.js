import m from 'mithril'
import Header from './header'
import Menu from './menu'
import Footer from './footer'

export default {
  view: ({ attrs: va, children }) => m('.wrap', [
    m(Header, {
      app: va.app,
      slug: va.slug
    }),
    m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
      m('.column.is-three-quarters-desktop.content', children),
      m(Menu, {
        app: va.app,
        slug: va.slug
      })
    ]))),
    m(Footer, {
      app: va.app,
      slug: va.slug
    })
  ])
}
