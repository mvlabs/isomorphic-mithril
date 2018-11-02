const Layout = process.env.BROWSER
  ? { view: ({ children }) => children }
  : require('../server/layout')

module.exports = Layout
