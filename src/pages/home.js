import m from 'mithril'
import decodeHTML from 'decode-html'
import EditButton from '../components/edit-button'
import Layout from '../components/layout'
import LoadingDots from '../components/loading-dots'
import Wrapper from '../components/wrapper'
import NotFound from './notfound'
import { decode } from '../lib/decode-markdown'

const Home = {
  oninit: ({ attrs: va, state: vs }) => new Promise(resolve => {
    vs.page = {
      slug: 'index',
      title: va.app.t('header.title')
    }
    const statePrefix = `home.${va.app.activeLanguage}`

    const pageContent = va.app.state.get(statePrefix + '.content')
    if (!pageContent) {
      vs.loading = true
      va.app.fetcher.getSection('index')
        .then(decode)
        .then(content => {
          vs.page.content = m.trust(content)
          va.app.state.set(statePrefix + '.content', content)
          vs.loading = false
          resolve()
        })
        .catch(err => {
          vs.error = err
          resolve()
        })
    } else {
      vs.page.content = m.trust(decodeHTML(pageContent))
      resolve()
    }
  }),

  view: ({ attrs: va, state: vs }) => {
    if (vs.error) return m(NotFound, { app: va.app })
    return m(Wrapper, {
      app: va.app,
      page: vs.page
    }, m(Layout, {
      app: va.app,
      page: vs.page
    }, [
      vs.loading
        ? m(LoadingDots)
        : vs.page.content,
      m(EditButton, {
        app: va.app,
        page: vs.page
      })
    ]))
  }
}

export default Home
