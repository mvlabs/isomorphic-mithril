const m = require('mithril');
const EditButton = require('./EditButton');
const Prism = process.browser ? require('prismjs') : null;

module.exports = {
    oncreate: () => {
        Prism.highlightAll();
    },

    view: vnode => [
        vnode.attrs.content,
        m(EditButton, { activeLanguage: vnode.attrs.activeLanguage, section: vnode.attrs.slug })
    ]
};