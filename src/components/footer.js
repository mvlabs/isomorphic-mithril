import m from 'mithril'
import { distPath } from '../config'

const Footer = {
  view: ({ attrs: va }) => m('footer.footer', [
    m('.container', [
      m('.columns.is-desktop.reverse-row-order', [
        m('.column.is-three-quarters-desktop.has-text-right-desktop', [
          `${va.app.t('footer.project_by')} `,
          m('a', {
            href: 'http://www.acxwebdesign.com/',
            target: '_blank',
            rel: 'noopener noreferrer',
            title: 'ACX webdesign'
          }, 'Andrea Coiutti'),
          ` ${va.app.t('footer.and')} `,
          m('a', {
            href: 'https://twitter.com/lucamonfredo',
            target: '_blank',
            rel: 'noopener noreferrer',
            title: 'Luca Monfredo'
          }, 'Luca Monfredo'),
          ` · ${va.app.t('footer.powered_by')} `,
          m('a', {
            href: 'http://mvlabs.it/',
            target: '_blank',
            rel: 'noopener noreferrer',
            title: 'MV Labs'
          }, m('img.va-mid', {
            src: `${distPath}/mv-logo.png`,
            alt: 'MV Labs',
            width: '100'
          }))
        ]),
        m('.column', [
          m('a', {
            href: '/' + va.app.activeLanguage + '/admin',
            oncreate: m.route.link
          }, va.app.t('footer.admin_area'))
        ])
      ])
    ])
  ])
}

export default Footer
