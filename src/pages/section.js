import m from 'mithril'
import decodeHTML from 'decode-html'
import Layout from '../components/layout'
import LoadingDots from '../components/loading-dots'
import Wrapper from '../components/wrapper'
import SectionContent from '../components/section-content'
import NotFound from './notfound'

export default {
  // trololol
  onmatch: (attrs, requestedPath) => {
    const slug = requestedPath.substr(requestedPath.lastIndexOf('/') + 1)
    if (slug === 'index') {
      if (attrs.res) {
        attrs.res.redirect('/')
      } else {
        m.route.set('/')
      }
    } else {
      return {
        oninit: ({ attrs: va, state: vs }) => new Promise(resolve => {
          vs.page = {}
          vs.slug = va.key
          vs.isSection = true
          const statePrefix = `section.${vs.slug}.${va.app.activeLanguage}`

          vs.sections = va.app.stateman.get('sections')
          vs.sections.map(section => {
            if (section.slug === vs.slug) {
              vs.page.title = section.title
              vs.page.description = section.description
            }
          })

          const pageContent = va.app.stateman.get(`${statePrefix}.content`)
          if (pageContent) {
            vs.page.content = m.trust(decodeHTML(pageContent))
          } else {
            vs.loading = true
            va.app.fetcher.getSection(vs.slug)
              .then(content => {
                vs.page.content = m.trust(content)
                va.app.stateman.set(`${statePrefix}.content`, content)
                vs.loading = false
                resolve()
              })
              .catch(err => {
                vs.error = err
                resolve()
              })
          }
        }),

        view: ({ attrs: va, state: vs }) => {
          if (vs.error) return m(NotFound, { app: va.app })
          return m(Wrapper, {
            app: va.app,
            page: vs.page
          }, m(Layout, {
            app: va.app,
            slug: vs.slug
          }, [
            vs.loading || !vs.page.content
              ? m(LoadingDots)
              : m(SectionContent, {
                app: va.app,
                content: vs.page.content,
                slug: vs.slug
              })
          ]))
        }
      }
    }
  }
}
