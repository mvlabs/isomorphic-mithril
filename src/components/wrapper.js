const Wrapper = process.env.BROWSER
  ? { view: ({ children }) => children }
  : require('../server-side-render/wrapper')

module.exports = Wrapper
