const m = require('mithril');
const componentInit = require('../componentInit.js');
const Footer = require('../components/Footer');
const Header = require('../components/Header');
const Layout = require('../components/Layout');
const Menu = require('../components/Menu');
const t = require('../translate.js');

let vm;

module.exports = {
    oninit: (vnode) => {
        vm = componentInit(vnode);
        vm.section.slug = 'notfound';
        vm.error = vnode.attrs.error || {
            status: 404,
            message: 'Not Found'
        };
        vnode.state.errorMessage = vm.error.message === 'Not Found' ? t('error.not_found') : '?';
    },

    view: vnode => m(Layout, vm, m('.wrap', [
        m(Header, vm),
        m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
            m('.column.is-three-quarters-desktop.content', [
                m('h1', t('error.error') + ' ' + vm.error.status + ': ' + vnode.state.errorMessage),
                m('p.text-center', m('img.img-fluid', {
                    src: `/assets/img/${vm.error.status}.jpg`,
                    alt: `${vm.error.status} error`
                }))
            ]),
            m(Menu, vm)
        ]))),
        m(Footer, vm)
    ]))
};