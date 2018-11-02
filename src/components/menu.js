import m from 'mithril'
import t from '../translate.js'

export default {
  oninit: ({ attrs: va, state: vs }) => {
    vs.sections = va.sections || []
  },

  view: ({ attrs: va, state: vs }) => m('.sidebar.column', [
    m('nav', [
      m('p', m('strong', t('sidebar.toc'))),
      m('ol.toc', vs.sections.map(section => m('li', m('a.toc-link', {
        href: '/' + va.globals.activeLanguage + '/' + (section.slug === 'index' ? '' : 'sections/' + section.slug),
        oncreate: m.route.link,
        className: va.slug === section.slug ? 'active' : ''
      }, section.title))))
    ])
  ])
}
