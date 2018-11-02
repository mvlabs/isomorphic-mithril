# Integrations

Integrating third party libriaries into SPA frameworks could not be trivial at all. Mithril, instead, allows to easily
integrate external code to manipulate the DOM outside the virtual DOM inner workings.

Let's take as example this website: we use [Prism](http://prismjs.com/) as syntax highlighter for all the code snippets. 
Prism applies the syntax highlighting by doing manipulations in the DOM: all styling is done through CSS, so it adds 
sensible class names to the HTML markup. Because of that it can't work on server side, so we need to require it only on 
client side, otherwise we will get errors in Node.js (there is no DOM on server side):

```javascript
const Prism = process.browser ? require('prismjs') : null;
```

For the same reason, we want Prism run only after the content with the code snippets is rendered by Mithril. For that we 
simply use the *Mithril*'s [`oncreate` lifecycle method](https://mithril.js.org/lifecycle-methods.html#oncreate). The 
virtual node of our content in the `view` of our `app/pages/Section.js` main component will then look like:

```javascript
vnode.state.loading || !vm.section.content ? m(LoadingDots) : m('div', {
    oncreate: () => Prism.highlightAll()
}, vm.section.content)
```

And that's it! In this way we have implemented the last point of the sequence:

1. the async request fetches the content (markdown file) in the `oninit`
2. the content replaces the loading animation (`LoadingDots` component) in the view
3. Prism processes the real DOM and applies the syntax highlighting

Maybe you are questioning if `Prism.highlightAll()` will throw errors because `Prism = null` on the server. It wont, 
because the `oncreate` lifecycle method isn't called on the server by `mithril-node-renderer` (only the `oninit` and the 
`view` are).
