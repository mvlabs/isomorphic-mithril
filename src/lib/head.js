import t from './translate'

const setHead = attrs => {
  const head = {}
  head.title = `${attrs.page.title || '[MISSING TITLE]'} · `
  head.title += t('header.title')
  head.description = attrs.page.description
  return head
}

export {
  setHead
}
