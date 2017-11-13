const m = require('mithril');
const t = require('../translate.js');

module.exports = {
    view: vnode => m('a.edit-page', {
        href: `https://github.com/mvlabs/isomorphic-mithril/blob/master/docs/${vnode.attrs.activeLanguage}/${vnode.attrs.section}.md`,
        target: '_blank',
        title: t('content.edit_on_github')
    }, m('img', {src: 'https://icongr.am/fontawesome/pencil.svg?color=aaaaaa&size=24'}))
};
