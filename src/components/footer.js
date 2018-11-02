import m from 'mithril'
import t from '../translate.js'

const Footer = {
  view: vnode => m('footer.footer', [
    m('.container', [
      m('.columns.is-desktop.reverse-row-order', [
        m('.column.is-three-quarters-desktop.has-text-right-desktop', [
          t('footer.project_by') + ' ',
          m('a', {
            href: 'http://www.acxwebdesign.com/',
            target: '_blank',
            rel: 'noopener noreferrer',
            title: 'ACX webdesign'
          }, 'Andrea Coiutti'),
          ' ' + t('footer.and') + ' ',
          m('a', {
            href: 'https://twitter.com/lucamonfredo',
            target: '_blank',
            rel: 'noopener noreferrer',
            title: 'Luca Monfredo'
          }, 'Luca Monfredo'),
          ' · ' + t('footer.powered_by') + ' ',
          m('a', {
            href: 'http://mvlabs.it/',
            target: '_blank',
            rel: 'noopener noreferrer',
            title: 'MV Labs'
          }, m('img.va-mid', {
            src: '/dist/img/mv-logo.png',
            alt: 'MV Labs',
            width: '100'
          }))
        ]),
        m('.column', [
          m('a', {
            href: '/' + vnode.attrs.globals.activeLanguage + '/admin',
            oncreate: m.route.link
          }, t('footer.admin_area'))
        ])
      ])
    ])
  ])
}

export default Footer
