const m = require('mithril');

module.exports = {
    view: function(vnode) {
        return m('strong.loadingdots', vnode.attrs, [
            m('span.loadingdot', '.'),
            m('span.loadingdot.loadingdot-second', '.'),
            m('span.loadingdot.loadingdot-third', '.')
        ]);
    }
};