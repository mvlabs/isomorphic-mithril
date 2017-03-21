const m = require('mithril');
const t = require('../translate.js');


module.exports = {
    oninit: vnode => {
        vnode.state.sections = vnode.attrs.sections || [];
    },

    view: vnode => m('.sidebar.col-lg-3.pull-lg-9', [
        m('nav', [
            m('p', m('strong', t('sidebar.toc'))),
            m('ol.toc', vnode.state.sections.map(section => m('li', m('a.toc-link', {
                href: '/' + vnode.attrs.globals.activeLanguage + '/' + (section.slug === 'index' ? '' : 'sections/' + section.slug),
                oncreate: m.route.link,
                className: vnode.attrs.slug === section.slug ? 'active' : ''
            }, section.title))))
        ])
    ])
};