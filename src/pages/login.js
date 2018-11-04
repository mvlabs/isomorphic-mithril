import m from 'mithril'
import Footer from '../components/footer'
import Header from '../components/header'
import Wrapper from '../components/wrapper'
import Menu from '../components/menu'

const withKey = callback => e => {
  if (e.keyCode === 13) callback()
}

export default {
  oninit: ({ attrs: va, state: vs }) => {
    vs.page = {
      slug: 'login',
      title: va.app.t('login.login')
    }
    vs.loginForm = {
      email: 'elijah.scott@example.com',
      password: 'secretpassword'
    }
    vs.loading = false

    vs.submit = () => {
      if (!vs.loginForm.email || !vs.loginForm.password) return
      vs.loading = true
      va.app.fetcher.login(vs.loginForm.email, vs.loginForm.password)
        .then(response => {
          if (response.error) {
            vs.error = response.error
            vs.loginForm.password = ''
            vs.loading = false
            m.redraw()
          } else {
            m.route.set(`/${va.app.activeLanguage}/admin`)
          }
        })
        .catch(err => {
          vs.loading = false
          vs.error = err
        })
    }
  },

  view: ({ attrs: va, state: vs }) => m(Wrapper, {
    app: va.app,
    page: vs.page
  }, m('.wrap', [
    m(Header, {
      app: va.app,
      page: vs.page
    }),
    m('main.main.section', m('.container', m('.columns.is-desktop.reverse-row-order', [
      m('.column.is-three-quarters-desktop.content', [
        m('h1', va.app.t('login.login')),
        m('form.login-form.', [
          vs.error ? m('p.alert.alert-danger', m('strong', vs.error.message)) : null,
          m('label.mb2', {
            for: 'login-email',
            autocomplete: 'login-email'
          }, va.app.t('login.email_address')),
          m('.control', [
            m('input.input', {
              oninput: m.withAttr('value', val => { vs.loginForm.email = val }),
              value: vs.loginForm.email,
              id: 'login-email',
              type: 'email',
              required: true,
              autofocus: true,
              onkeypress: withKey(vs.submit)
            })
          ]),
          m('label.mb2', {
            for: 'login-password',
            autocomplete: 'login-password'
          }, va.app.t('login.password')),
          m('.control', [
            m('input.input', {
              oninput: m.withAttr('value', val => { vs.loginForm.password = val }),
              value: vs.loginForm.password,
              id: 'login-password',
              type: 'password',
              required: true,
              onkeypress: withKey(vs.submit)
            })
          ]),
          m('.actions', vs.loading
            ? m('button.btn.btn-primary.btn-block.btn-lg.text-uppercase', {
              type: 'button'
            }, m('i.fa.fa-spinner.fa-pulse'))
            : m('button.button.is-primary.is-uppercase.mt2', {
              type: 'button',
              onclick: vs.submit
            }, va.app.t('login.login')))
        ])
      ]),
      m(Menu, {
        app: va.app,
        page: vs.page
      })
    ]))),
    m(Footer, {
      app: va.app,
      page: vs.page
    })
  ]))
}
