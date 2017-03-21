const m = require('mithril');
const componentInit = require('../componentInit.js');
const EditButton = require('../components/EditButton.js');
const Footer = require('../components/Footer.js');
const he = require('he');
const Header = require('../components/Header.js');
const LoadingDots = require('../components/LoadingDots.js');
const Layout = require('../components/Layout.js');
const Menu = require('../components/Menu.js');
const NotFound = require('./NotFound.js');


let vm;

module.exports = {
    oninit: vnode => new Promise((resolve) => {
        vm = componentInit(vnode);
        vm.slug = 'index';
        const statePrefix = 'home.' + vm.globals.activeLanguage;

        if (!vm.stateman.get(statePrefix + '.content')) {
            vnode.state.loading = true;
            vm.fetcher.getSection('index')
                .then((content) => {
                    vm.section.content = m.trust(content);
                    vm.stateman.set(statePrefix + '.content', content);
                    vnode.state.loading = false;
                    m.redraw();
                    resolve();
                })
                .catch((err) => {
                    vm.error = err;
                    m.redraw();
                    resolve();
                });
        } else {
            vm.section.content = m.trust(he.decode(vm.stateman.get(statePrefix + '.content')));
            resolve();
        }
    }),

    view: vnode => vm.error ? m(NotFound, vm) : m(Layout, vm, [
        m(Header, vm),
        m('main.main.container', m('.row', [
            m('.col.col-lg-9.push-lg-3', [
                m(EditButton, { activeLanguage: vm.globals.activeLanguage, section: vm.slug }),
                vnode.state.loading ? m(LoadingDots) : vm.section.content
            ]),
            m(Menu, vm)
        ])),
        m(Footer, vm)
    ])
};
