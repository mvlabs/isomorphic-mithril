/* global document */
import m from 'mithril'
import { distPath } from '../config'

const languages = require('../../docs/languages.json').filter(language => ['en', 'it'].includes(language.slug))

export default {
  view: ({ attrs: va }) => m('.navbar-item.has-dropdown.is-hoverable', [
    va.globals.activeLanguage ? m('a.navbar-link.is-uppercase', [
      m('img.switch-lang-flag', {
        src: `${distPath}/flag-${va.globals.activeLanguage}.png`,
        alt: ''
      }),
      va.globals.activeLanguage
    ]) : null,
    m('.navbar-dropdown', languages.map(language => language.slug !== va.globals.activeLanguage && m('a.navbar-item', {
      href: '/' + language.slug + '/' + (va.slug === 'index' ? '' : (va.isSection ? 'sections/' : '') + va.slug)
    }, [
      m('img.switch-lang-flag', {
        src: `${distPath}/flag-${language.slug}.png`,
        alt: ''
      }),
      language.name
    ])))
  ])
}
