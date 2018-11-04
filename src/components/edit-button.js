import m from 'mithril'
import t from '../lib/translate'

export default {
  view: ({ attrs: va }) => m('a.edit-page', {
    href: `https://github.com/mvlabs/isomorphic-mithril/blob/master/docs/${va.app.activeLanguage}/${va.slug}.md`,
    target: '_blank',
    title: t('content.edit_on_github')
  }, m('img', { src: 'https://icongr.am/fontawesome/pencil.svg?color=aaaaaa&size=24' }))
}
