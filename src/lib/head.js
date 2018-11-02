import t from '../translate.js'

const setHead = (va) => {
  const head = {}
  head.title = (va.title || '[MISSING TITLE]') + ' · '
  if (va.slug === 'index') head.title = ''
  head.title += t('header.title')
  head.description = va.description
  return head
}

export {
  setHead
}
