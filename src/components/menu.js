import m from 'mithril'

export default {
  oninit: ({ attrs: va, state: vs }) => {
    vs.sections = va.app.state.get('sections') || []
  },

  view: ({ attrs: va, state: vs }) => m('.sidebar.column', [
    m('nav', [
      m('p', m('strong', va.app.t('sidebar.toc'))),
      m('ol.toc', vs.sections.map(section => m('li', m('a.toc-link', {
        href: '/' + va.app.activeLanguage + '/' + (section.slug === 'index' ? '' : 'sections/' + section.slug),
        oncreate: m.route.link,
        className: va.page.slug === section.slug ? 'active' : ''
      }, section.title))))
    ])
  ])
}
