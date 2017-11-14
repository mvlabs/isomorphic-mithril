const m = require('mithril');
const t = require('../translate.js');

const setHead = (vnode) => {
    const head = {};
    head.title = (vnode.attrs.title || '[MISSING TITLE]') + ' · ';
    if (vnode.attrs.slug === 'index') head.title = '';
    head.title += t('header.title');
    head.description = vnode.attrs.description;
    return head;
};


// CLIENT SIDE LAYOUT
const LayoutClient = {
    oncreate: (vnode) => {
        const head = setHead(vnode);
        document.title = head.title;
        // $('meta[name=description]').replaceWith( '<meta name="description" content="' + head.description + '">' );
        const metaList = document.getElementsByTagName('META');
        metaList[3].setAttribute('name', 'description');
        metaList[3].setAttribute('content', head.description);
        console.log('metaList:', metaList);
    },

    view: vnode => vnode.children
};


// SERVER SIDE LAYOUT
const LayoutServer = {
    oninit: vnode => {
        vnode.state.head = setHead(vnode);
        vnode.state.hash = vnode.attrs.stateman.get('hash');
    },

    view: vnode => [
        m('!doctype[html]'),
        m('html', {lang: vnode.attrs.globals.activeLanguage || 'en'}, [
            m('head', [
                m('meta', {charset: 'utf-8'}),
                m('meta', {name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'}),
                m('meta', {'http-equiv': 'x-ua-compatible', content: 'ie=edge'}),
                m('title', vnode.state.head.title),
                m('meta', {name: 'description', content: vnode.state.head.description}),
                m('link', {rel: 'stylesheet', href: `/assets/css/style.${vnode.state.hash}.min.css`}),
                m('link', {rel: 'shortcut icon', href: '/assets/img/favicon.ico'})
            ]),
            m('body', [
                vnode.children,
                m('script', `window.__preloadedState = ${vnode.attrs.stateman._getString()}`),
                m('script', {src: `/assets/js/app.${vnode.state.hash}.min.js`}),
                m('script', `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-23409117-16', 'auto');
  ga('send', 'pageview');`)
            ])
        ])
    ]
};

module.exports = process.browser ? LayoutClient : LayoutServer;
