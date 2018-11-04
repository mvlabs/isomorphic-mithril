import m from 'mithril'

// const t = require('../translate')
import { setHead } from '../lib/head'

import { gtmID } from '../config'

// SERVER SIDE LAYOUT
const Wrapper = {
  oninit: ({ attrs: va, state: vs }) => {
    vs.head = setHead({
      app: va.app,
      page: va.page
    })
    vs.hashes = va.app.stateman.get('hashes')
  },

  view: ({ attrs: va, children, state: vs }) => [
    // m('!doctype[html]'),
    m('html', { lang: va.app.activeLanguage || 'en' }, [
      m('head', [
        m('meta', { charset: 'utf-8' }),
        m('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }),
        m('meta', { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' }),
        m('title', vs.head.title),
        m('meta', { name: 'description', content: vs.head.description }),
        m('link', { rel: 'stylesheet', href: `/dist/app.${vs.hashes.css}.css` }),
        m('link', { rel: 'shortcut icon', href: '/dist/favicon.ico' })
      ]),
      m('body', [
        children,
        m('script', `window.__preloadedState = ${va.app.stateman._getString()}`),
        m('script', { src: `/dist/app.${vs.hashes.js}.js` }),
        gtmID ? m('script', `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '${gtmID}', 'auto');
  ga('send', 'pageview');`) : null
      ])
    ])
  ]
}

export default Wrapper
