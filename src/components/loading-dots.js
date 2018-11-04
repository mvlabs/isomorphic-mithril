import m from 'mithril'

export default {
  view: ({ attrs }) => m('strong.loadingdots', attrs, [
    m('span.loadingdot', '.'),
    m('span.loadingdot.loadingdot-second', '.'),
    m('span.loadingdot.loadingdot-third', '.')
  ])
}
