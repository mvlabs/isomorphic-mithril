const m = require('mithril');
const LanguagePicker = require('./LanguagePicker.js');
const t = require('../translate.js');

module.exports = {
    oninit: vnode => {
        vnode.state.isAuth = vnode.attrs.fetcher.isAuth();
    },
    
    // view: vnode => m('nav.navbar.is-primary', [
    //     m('.container', [
    //         m('nav.navbar[aria-label="dropdown navigation"][role="navigation"]', [
    //             m('.navbar-item.has-dropdown', [
    //                 m('a.navbar-link', 'Docs'),
    //                 m('.navbar-dropdown', [
    //                     m('a.navbar-item', 'Overview'),
    //                     m('a.navbar-item', 'Elements'),
    //                     m('a.navbar-item', 'Components'),
    //                     m('hr.navbar-divider'),
    //                     m('.navbar-item', 'Version 0.6.1')
    //                 ])
    //             ])
    //         ])
    //     ]),
    //     m('.container', [
    //         m('a.navbar-brand', {
    //             href: '/' + vnode.attrs.globals.activeLanguage + '/',
    //             oncreate: m.route.link
    //         }, t('header.title')),
    //         m('nav.navbar.navbar-toggleable-sm.navbar-inverse.bg-primary', [
    //             m('button.navbar-toggler.navbar-toggler-right[aria-controls="navbar-menu"][aria-expanded="false"][aria-label="Toggle navigation"][data-target="#navbar-menu"][data-toggle="collapse"][type="button"]', [
    //                 m('span.navbar-toggler-icon')
    //             ]),
    //             m('a.navbar-brand', {
    //                 href: '/' + vnode.attrs.globals.activeLanguage + '/',
    //                 oncreate: m.route.link
    //             }, t('header.title')),
    //             m('.collapse.navbar-collapse[id="navbar-menu"]', [
    //                 m('ul.navbar-nav', [
    //                     m('li.nav-item', [
    //                         m('a.nav-link', {
    //                             href: 'https://github.com/mvlabs/isomorphic-mithril',
    //                             target: '_blank',
    //                             rel: 'noopener noreferrer'
    //                         }, [
    //                             m('.github-icon', m('img', {
    //                                 src: 'https://icongr.am/fontawesome/github.svg?color=ffffff&size=24'
    //                             })),
    //                       'GitHub'
    //                         ])
    //                     ]),
    //                     m(LanguagePicker, {
    //                         globals: vnode.attrs.globals,
    //                         slug: vnode.attrs.slug,
    //                         isSection: vnode.attrs.isSection === true
    //                     }),
    //                     vnode.state.isAuth ? m('button.btn-link.nav-link', {
    //                         onclick: vnode.attrs.fetcher.logout
    //                     }, t('login.logout')) : null
    //                 ])
    //             ])
    //         ])
    //     ])
    // ])
    
    view: vnode => m('nav.navbar.is-primary', [
        m('.container', [
            m('.navbar-brand', [
                m('a.navbar-item[href="https://bulma.io"]', {
                    href: `/${vnode.attrs.globals.activeLanguage}/`,
                    oncreate: m.route.link
                }, t('header.title')),
                m('.navbar-burger.burger[data-target="navbar-menu"]', [
                    m('span'),
                    m('span'),
                    m('span')
                ])
            ]),
            m('.navbar-menu[id="navbar-menu"]', [
                m('.navbar-end', [
                    m('a.navbar-item', {
                        href: 'https://github.com/mvlabs/isomorphic-mithril',
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    }, [
                        m('.github-icon', m('img', {
                            src: 'https://icongr.am/fontawesome/github.svg?color=ffffff&size=20'
                        })),
                        'Github'
                    ]),
                    m(LanguagePicker, {
                        globals: vnode.attrs.globals,
                        slug: vnode.attrs.slug,
                        isSection: vnode.attrs.isSection === true
                    }),
                    vnode.state.isAuth ? m('a.navbar-item', {
                        href: '#',
                        onclick(e) {
                            e.preventDefault();
                            vnode.attrs.fetcher.logout();
                        }
                    }, t('login.logout')) : null
                ])
            ])
        ])
    ])
};

