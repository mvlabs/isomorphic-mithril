import m from 'mithril'

export default {
  view: ({ attrs: va }) => {
    return m('strong.loadingdots', va, [
      m('span.loadingdot', '.'),
      m('span.loadingdot.loadingdot-second', '.'),
      m('span.loadingdot.loadingdot-third', '.')
    ])
  }
}
