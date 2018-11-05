const Wrapper = process.env.BROWSER
  ? { view: vnode => vnode.children }
  : require('../server-side-render/wrapper')

module.exports = Wrapper
