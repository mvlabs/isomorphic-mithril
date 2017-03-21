// SERVER SIDE APP
// ==============================================================

'use strict';
require('mithril/test-utils/browserMock')(global);
global.window.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;

const server = require('./app/server');
const port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log('Listening on localhost:' + port + '...');
});