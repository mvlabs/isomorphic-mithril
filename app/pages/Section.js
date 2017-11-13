const m = require('mithril');
const componentInit = require('../componentInit.js');
const Footer = require('../components/Footer');
const he = require('he');
const Header = require('../components/Header.js');
const LoadingDots = require('../components/LoadingDots');
const Layout = require('../components/Layout');
const Menu = require('../components/Menu');
const SectionContent = require('../components/SectionContent');
const NotFound = require('./NotFound.js');

let vm;

module.exports = {
    onmatch: (params, route) => {
        const slug = route.substr(route.lastIndexOf('/') + 1);
        if (slug === 'index') {
            if (params.res) {
                params.res.redirect('/');
            } else {
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
                m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
                    m('.column.is-three-quarters-desktop.content', [
                        vnode.state.loading || !vm.section.content ? m(LoadingDots) : m(SectionContent, {
                            content: vm.section.content,
                            activeLanguage: vm.globals.activeLanguage,
                            section: vm.slug
                        })
                    ]),
                    m(Menu, vm)
                ]))),
                m(Footer, vm)
            ])
        };
    }
};
