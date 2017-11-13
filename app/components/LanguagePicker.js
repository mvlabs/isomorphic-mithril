/* global document */
const m = require('mithril');
const languages = require('../../docs/languages.json').filter(language => ['en', 'it'].includes(language.slug));

module.exports = {
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
