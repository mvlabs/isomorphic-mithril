import m from 'mithril'
import componentInit from '../componentInit.js'
import Footer from '../components/footer'
import he from 'he'
import Header from '../components/header.js'
import LoadingDots from '../components/loading-dots'
import Layout from '../components/layout'
import Menu from '../components/menu'
import SectionContent from '../components/section-content'
import NotFound from './notfound.js'

export default {
  onmatch: (params, route) => {
    const slug = route.substr(route.lastIndexOf('/') + 1)
    if (slug === 'index') {
      if (params.res) {
        params.res.redirect('/')
      } else {
        m.route.set('/')
      }
    } else {
      return {
        oninit: ({ attrs: va, state: vs }) => new Promise((resolve) => {
          vs.vm = componentInit(va)
          vs.vm.slug = va.key
          vs.vm.isSection = true
          const statePrefix = 'section.' + vs.vm.slug + '.' + vs.vm.globals.activeLanguage

          vs.vm.sections.map((section) => {
            if (section.slug === vs.vm.slug) {
              vs.vm.title = section.title
              vs.vm.description = section.description
            }
          })

          if (!vs.vm.stateman.get(statePrefix + '.content')) {
            vs.loading = true
            vs.vm.fetcher.getSection(vs.vm.slug)
              .then((content) => {
                vs.vm.section.content = m.trust(content)
                vs.vm.stateman.set(statePrefix + '.content', content)
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
            vs.vm.section.content = m.trust(he.decode(vs.vm.stateman.get(statePrefix + '.content')))
            resolve()
          }
        }),

        view: ({ attrs: va, state: vs }) => vs.vm.error ? m(NotFound, vs.vm) : m(Layout, vs.vm, m('.wrap', [
          m(Header, vs.vm),
          m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
            m('.column.is-three-quarters-desktop.content', [
              vs.loading || !vs.vm.section.content ? m(LoadingDots) : m(SectionContent, {
                content: vs.vm.section.content,
                activeLanguage: vs.vm.globals.activeLanguage,
                section: vs.vm.slug
              })
            ]),
            m(Menu, vs.vm)
          ]))),
          m(Footer, vs.vm)
        ]))
      }
    }
  }
}
