const m = require('mithril');
const t = require('../translate.js');

module.exports = {
    view: vnode => m('footer.footer', [
        m('.container', [
            m('.row', [
                m('.col.col-12.col-lg-9.push-lg-3.text-lg-right', [
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
                        title: 'MVlabs'
                    }, m('img', {
                        src: '/assets/img/mv-logo.png',
                        alt: 'MVlabs',
                        width: '100'
                    }))
                ]),
                m('.col.col-12.col-lg-3.pull-lg-9', [
                    m('a', {
                        href: '/' + vnode.attrs.globals.activeLanguage + '/admin',
                        oncreate: m.route.link
                    }, t('footer.admin_area'))
                ])
            ])
        ])
    ])
};
