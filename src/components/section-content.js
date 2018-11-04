import m from 'mithril'
import EditButton from './edit-button'
const Prism = process.browser ? require('prismjs') : null

export default {
  oncreate: () => {
    Prism.highlightAll()
  },

  view: ({ attrs: va, children }) => [
    children,
    m(EditButton, {
      app: va.app,
      page: va.page
    })
  ]
}
