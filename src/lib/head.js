const setHead = va => {
  const head = {}
  head.title = `${va.page.title || '[MISSING TITLE]'} · `
  head.title += va.app.t('header.title')
  head.description = va.page.description
  return head
}

export {
  setHead
}
