require('mithril/test-utils/browserMock')(global)
global.window.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest
