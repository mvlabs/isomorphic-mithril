/* global document */
const m = require('mithril');
const languages = require('../../docs/languages.json').filter(language => ['en', 'it'].includes(language.slug));

module.exports = {
    oncreate: () => {
        // document.addEventListener('DOMContentLoaded', function () {
        //
        //     // Get all "navbar-burger" elements
        //     const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        //
        //     // Check if there are any navbar burgers
        //     if (navbarBurgers.length > 0) {
        //
        //         // Add a click event on each of them
        //         navbarBurgers.forEach(el => {
        //             el.addEventListener('click', () => {
        //
        //                 // Get the target from the "data-target" attribute
        //                 var target = el.dataset.target;
        //                 var $target = document.getElementById(target);
        //
        //                 // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        //                 el.classList.toggle('is-active');
        //                 $target.classList.toggle('is-active');
        //
        //             });
        //         });
        //     }
        //
        // });
    },

    // view: (vnode) => m('.nav-item.dropdown', [
    //     vnode.attrs.globals.activeLanguage ? m('a.dropdown-toggle.nav-link.text-uppercase[href="#"][aria-expanded="false"][aria-haspopup="true"][data-toggle="dropdown"][id="switch-lang"]', [
    //         m('img.switch-lang-flag[src="/assets/img/flags/' + vnode.attrs.globals.activeLanguage + '.png"]'), ' ' + vnode.attrs.globals.activeLanguage
    //     ]) : null,
    //     m('.dropdown-menu.dropdown-menu-right[aria-labelledby="switch-lang"]', [
    //         languages.map((language) => (language.slug === vnode.attrs.globals.activeLanguage ? null : m('a.dropdown-item', {
    //             href: '/' + language.slug + '/' + (vnode.attrs.slug === 'index' ? '' : (vnode.attrs.isSection ? 'sections/' : '') + vnode.attrs.slug)
    //         }, [
    //             m('img.switch-lang-flag[src="/assets/img/flags/' + language.slug + '.png"]'), ' ', language.name
    //         ])))
    //     ])
    // ])

    view: vnode => m('.navbar-item.has-dropdown.is-hoverable', [
        vnode.attrs.globals.activeLanguage ? m('a.navbar-link.is-uppercase', [
            m('img.switch-lang-flag', {
                src: `/assets/img/flags/${vnode.attrs.globals.activeLanguage}.png`,
                alt: ''
            }),
            vnode.attrs.globals.activeLanguage
        ]) : null,
        m('.navbar-dropdown', languages.map(language => language.slug !== vnode.attrs.globals.activeLanguage && m('a.navbar-item', {
            href: '/' + language.slug + '/' + (vnode.attrs.slug === 'index' ? '' : (vnode.attrs.isSection ? 'sections/' : '') + vnode.attrs.slug)
        }, [
            m('img.switch-lang-flag', {
                src: `/assets/img/flags/${language.slug}.png`,
                alt: ''
            }),
            language.name
        ])))
    ])
};
