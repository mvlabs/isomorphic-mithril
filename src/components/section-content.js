import m from 'mithril'
import EditButton from './edit-button'
const Prism = process.browser ? require('prismjs') : null

export default {
  oncreate: () => {
    Prism.highlightAll()
  },

  view: ({ attrs: va }) => [
    va.content,
    m(EditButton, {
      app: va.app,
      slug: va.slug
    })
  ]
}
