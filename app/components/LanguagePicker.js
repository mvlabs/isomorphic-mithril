const m = require('mithril');
const languages = require('../../docs/languages.json').filter(language => ['en', 'it'].includes(language.slug));

module.exports = {
    view: (vnode) => m('.nav-item.dropdown', [
        vnode.attrs.globals.activeLanguage ? m('a.dropdown-toggle.nav-link.text-uppercase[href="#"][aria-expanded="false"][aria-haspopup="true"][data-toggle="dropdown"][id="switch-lang"]', [
            m('img.switch-lang-flag[src="/assets/img/flags/' + vnode.attrs.globals.activeLanguage + '.png"]'), ' ' + vnode.attrs.globals.activeLanguage
        ]) : null,
        m('.dropdown-menu.dropdown-menu-right[aria-labelledby="switch-lang"]', [
            languages.map((language) => (language.slug === vnode.attrs.globals.activeLanguage ? null : m('a.dropdown-item', {
                href: '/' + language.slug + '/' + (vnode.attrs.slug === 'index' ? '' : (vnode.attrs.isSection ? 'sections/' : '') + vnode.attrs.slug)
            }, [
                m('img.switch-lang-flag[src="/assets/img/flags/' + language.slug + '.png"]'), ' ', language.name
            ])))
        ])
    ])
};
