// MISC VARS
// ----------------------------------------------------------------------------------------------------

const productionSiteURL = 'https://isomorphic-mithril.mvlabs.it'

const dateISOFormat = 'YYYY-MM-DD'

const gtmID = process.env.NODE_ENV === 'production'
  ? 'UA-23409117-16'
  : null

const siteURL = process.env.NODE_ENV === 'production'
  ? productionSiteURL
  : `http://localhost:${process.env.PORT || 3000}`

const xhrConfig = (xhr) => {
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
}

export {
  dateISOFormat,
  gtmID,
  siteURL,
  xhrConfig
}
