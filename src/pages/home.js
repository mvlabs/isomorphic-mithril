import m from 'mithril'
import he from 'he'
import componentInit from '../componentInit.js'
import EditButton from '../components/edit-button.js'
import Footer from '../components/footer.js'
import Header from '../components/header.js'
import LoadingDots from '../components/loading-dots.js'
import Layout from '../components/layout.js'
import Menu from '../components/menu.js'
import NotFound from './notfound.js'

const Home = {
  oninit: ({ attrs: va, state: vs }) => new Promise((resolve) => {
    vs.vm = componentInit(va)
    vs.vm.slug = 'index'
    const statePrefix = 'home.' + vs.vm.globals.activeLanguage

    if (!vs.vm.stateman.get(statePrefix + '.content')) {
      vs.loading = true
      vs.vm.fetcher.getSection('index')
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
        vs.loading ? m(LoadingDots) : vs.vm.section.content,
        m(EditButton, { activeLanguage: vs.vm.globals.activeLanguage, section: vs.vm.slug })
      ]),
      m(Menu, vs.vm)
    ]))),
    m(Footer, vs.vm)
  ]))
}

export default Home
