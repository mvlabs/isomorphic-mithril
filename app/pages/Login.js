const m = require('mithril');
const componentInit = require('../componentInit.js');
const Footer = require('../components/Footer.js');
const Header = require('../components/Header.js');
const Layout = require('../components/Layout.js');
const Menu = require('../components/Menu.js');
const t = require('../translate.js');


const withKey = (callback) => (e) => {
    if (e.keyCode === 13) callback();
};


let vm;

module.exports = {
    oninit: vnode => {
        vm = componentInit(vnode);
        vm.slug = 'login';
        vm.title = t('login.login');

        vnode.state.loginForm = {};
        vnode.state.loginForm.email = 'elijah.scott@example.com';
        vnode.state.loginForm.password = 'secretpassword';
        vnode.state.error = null;
        vnode.state.loading = false;

        vnode.state.submit = () => {
            if (!vnode.state.loginForm.email || !vnode.state.loginForm.password) return;
            vnode.state.loading = true;
            vm.fetcher.login(vnode.state.loginForm.email, vnode.state.loginForm.password)
                .then((response) => {
                    if (response.error) {
                        vnode.state.error = response.error;
                        vnode.state.loginForm.password = '';
                        vnode.state.loading = false;
                        m.redraw();
                    } else {
                        m.route.set('/' + vm.globals.activeLanguage + '/admin');
                    }
                })
                .catch((err) => {
                    vnode.state.loading = false;
                    vnode.state.error = err;
                });
        };
    },

    view: vnode => m(Layout, vm, [
        m(Header, vm),
        m('main.main.container', m('.row', [
            m('.col.col-lg-9.push-lg-3', [
                m('h1', t('login.login')),
                m('form.login-form', [
                    vnode.state.error ? m('p.alert.alert-danger', m('strong', vnode.state.error.message)) : null,
                    m('fieldset.form-group', [
                        m('label[for="login-email"][autocomplete="login-email"]', t('login.email_address')),
                        m('input.form-control.input-lg', {
                            oninput: m.withAttr('value', (val) => {vnode.state.loginForm.email = val;}),
                            value: vnode.state.loginForm.email,
                            id: 'login-email',
                            type: 'email',
                            required: true,
                            autofocus: true,
                            onkeypress: withKey(vnode.state.submit)
                        })
                    ]),
                    m('fieldset.form-group', [
                        m('label[for="login-password"][autocomplete="login-password"]', t('login.password')),
                        m('input.form-control.input-lg', {
                            oninput: m.withAttr('value', (val) => {vnode.state.loginForm.password = val;}),
                            value: vnode.state.loginForm.password,
                            id: 'login-password',
                            type: 'password',
                            required: true,
                            onkeypress: withKey(vnode.state.submit)
                        })
                    ]),
                    m('.actions', vnode.state.loading ? m('button.btn.btn-primary.btn-block.btn-lg.text-uppercase[type="button"]', m('i.fa.fa-spinner.fa-pulse')) :
                    m('button.btn.btn-primary.btn-lg.text-uppercase[type="button"]', {onclick: vnode.state.submit}, t('login.login')))
                ])
            ]),
            m(Menu, vm)
        ])),
        m(Footer, vm)
    ])
};
