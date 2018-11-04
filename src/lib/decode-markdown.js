import marked from 'marked'

// Decode markdown content
const decode = data => marked(data, {
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})

export {
  decode
}
