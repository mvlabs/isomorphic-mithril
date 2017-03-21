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
    onmatch: (params, route) => {
        const slug = route.substr(route.lastIndexOf('/') + 1);
        if (slug === 'index') {
            if (params.res) {
                params.res.redirect('/');
            } else {
                console.log('SONO QUI');
                m.route.set('/');
            }
        } else return {
            oninit: vnode => new Promise((resolve) => {
                vm = componentInit(vnode);
                vm.slug = vnode.attrs.key;
                vm.isSection = true;
                const statePrefix = 'section.' + vm.slug + '.' + vm.globals.activeLanguage;

                vm.sections.map((section) => {
                    if (section.slug === vm.slug) {
                        vm.title = section.title;
                        vm.description = section.description;
                    }
                });

                if (!vm.stateman.get(statePrefix + '.content')) {
                    vnode.state.loading = true;
                    vm.fetcher.getSection(vm.slug)
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

            view: (vnode) => vm.error ? m(NotFound, vm) : m(Layout, vm, [
                m(Header, vm),
                m('main.main.container', m('.row', [
                    m('.col.col-lg-9.push-lg-3', [
                        m(EditButton, { activeLanguage: vm.globals.activeLanguage, section: vm.slug }),
                        vnode.state.loading || !vm.section.content ? m(LoadingDots) : m('div', {
                            oncreate: () => Prism.highlightAll() // eslint-disable-line
                        }, vm.section.content)
                    ]),
                    m(Menu, vm)
                ])),
                m(Footer, vm)
            ])
        };
    }
};
