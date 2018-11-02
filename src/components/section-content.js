import m from 'mithril'
import EditButton from './edit-button'
const Prism = process.browser ? require('prismjs') : null

export default {
  oncreate: () => {
    Prism.highlightAll()
  },

  view: vnode => [
    vnode.attrs.content,
    m(EditButton, { activeLanguage: vnode.attrs.activeLanguage, section: vnode.attrs.slug })
  ]
}
