# Requests

## HTTP client

We aim to have a consistency between the server and the client when performing HTTP requests. This could be easily 
solved requiring an external HTTP client which works on bot Node.js (i.e. [axios](https://github.com/mzabriskie/axios)), 
but as we already have [*Mithril*'s own `m.request` API](http://mithril.js.org/request.html) on the client, we are going 
to use it also on the server.

At the beginning of our tutorial, you might have noticed the following line at the top of the entry point of our server 
side app, `server.js`:

```javascript
global.window.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;
```

This dependency is required to allow server-side XMLHttpRequest like W3C spec on Node.js, so we can consistently use 
[*Mithril*'s own `m.request` API](http://mithril.js.org/request.html) on both server and client.

Since we want a specific control on our how the requests are done, how the data is processed and how the errors are 
managed, we build our own wrapper around *Mithril*'s `m.request`, in `app/request.js`:

```javascript
const m = require('mithril');

const request = (options) => {
    const args = Object.assign({}, options, { extract: (xhr) => {
        const isJSON = xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1;
        if (xhr.status >= 400) {
            throw new Object({
                status: xhr.status,
                message: xhr.statusText
            });
        } else {
            return isJSON ? JSON.parse(xhr.responseText) : xhr.responseText;
        }
    } });
    return m.request(args)
        .catch(err => Promise.reject(err));
};
```

We can then define our own `get` and `post` methods based on our `request` function:

```javascript
module.exports = {
    get: (url, args) => {
        let options = {};
        options.method = 'GET';
        options.url = url;
        if (args && typeof args === 'object') {
            options = Object.assign(options, args);
        }

        return request(options);
    },

    post: (url, data, args) => {
        let options = {};
        options.method = 'POST';
        options.url = url;
        options.data = data;
        if (args && typeof args === 'object') {
            Object.assign(options, args);
        }

        return request(options);
    }
};
```


## Request functions

For convenience, we are going to group all the HTTP request functions in the same file (`app/resources.js`), which will 
look like:

```javascript
const request = require('./request.js');

const port = process.env.PORT || 3000;
const localUrl = 'http://' + (process.browser ? window.location.host : '127.0.0.1:' + port);
const localData = localUrl + '/docs';

const manageErrors = (err) => {
    return Promise.reject(err);
};

module.exports = {
    getContent: (content) => request.get(`${localData}/${content}.json`)
        .then(data => data)
        .catch(manageErrors),
        
    // ...
};
```

Since `m.request` returns a *Promise*, we define all our request functions to do the same, to be used in our async main
components.