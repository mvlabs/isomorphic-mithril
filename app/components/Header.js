const m = require('mithril');
const LanguagePicker = require('./LanguagePicker.js');
const t = require('../translate.js');

module.exports = {
    oninit: vnode => {
        vnode.state.isAuth = vnode.attrs.fetcher.isAuth();
    },

    oncreate: () => {
        // Get all "navbar-burger" elements
        const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        console.log('navbarBurgers:', navbarBurgers);
        // Check if there are any navbar burgers
        if (navbarBurgers.length > 0) {
            // Add a click event on each of them
            navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    // Get the target from the "data-target" attribute
                    const dataTarget = el.dataset.target;
                    const target = document.getElementById(dataTarget);
                    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    target.classList.toggle('is-active');
                });
            });
        }
    },

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
            m('.navbar-menu[id="navbar-menu"].is-primary', [
                m('.navbar-end', [
                    m('a.navbar-item', {
                        href: 'https://github.com/mvlabs/isomorphic-mithril',
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    }, [
                        m('img.va-mid.mr2', {
                            src: 'https://icongr.am/fontawesome/github.svg?color=ffffff&size=20'
                        }),
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

