const m = require('mithril');
const LanguagePicker = require('./LanguagePicker.js');
const t = require('../translate.js');

module.exports = {
    oninit: vnode => {
        vnode.state.isAuth = vnode.attrs.fetcher.isAuth();
    },
    view: vnode => m('header.header', [
        m('.container', [
            m('nav.navbar.navbar-toggleable-sm.navbar-inverse.bg-primary', [
                m('button.navbar-toggler.navbar-toggler-right[aria-controls="navbar-menu"][aria-expanded="false"][aria-label="Toggle navigation"][data-target="#navbar-menu"][data-toggle="collapse"][type="button"]', [
                    m('span.navbar-toggler-icon')
                ]),
                m('a.navbar-brand', {
                    href: '/' + vnode.attrs.globals.activeLanguage + '/',
                    oncreate: m.route.link
                }, t('header.title')),
                m('.collapse.navbar-collapse[id="navbar-menu"]', [
                    m('ul.navbar-nav', [
                        m('li.nav-item', [
                            m('a.nav-link', {
                                href: 'https://github.com/mvlabs/isomorphic-mithril',
                                target: '_blank',
                                rel: 'noopener noreferrer'
                            }, [
                                m('.github-icon', m('svg[viewBox="0 0 512 512"]', m('path[d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"]'))),
                                'GitHub'
                            ])
                        ]),
                        m(LanguagePicker, {
                            globals: vnode.attrs.globals,
                            slug: vnode.attrs.slug,
                            isSection: vnode.attrs.isSection === true
                        }),
                        vnode.state.isAuth ? m('button.btn-link.nav-link', {
                            onclick: vnode.attrs.fetcher.logout
                        }, t('login.logout')) : null
                    ])
                ])
            ])
        ])
    ])
};

