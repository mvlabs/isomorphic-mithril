const m = require('mithril');
const t = require('../translate.js');

module.exports = {
    view: vnode => m('a.edit-page.float-right', {
        href: `https://github.com/mvlabs/isomorphic-mithril/blob/master/docs/${vnode.attrs.activeLanguage}/${vnode.attrs.section}.md`,
        target: '_blank',
        title: t('content.edit_on_github')
    }, m('img', {src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAPVJREFUOI2dkTFOw0AQRd9f5RiUKdLkHlzAazc5ARUFkiPRAEXS0NOns9cnoMghKKAI3GRn6axVwIntX/7Re6PZFRPStu2zmT1IevXePwJoLNw0zQ6os2rvvd+OEnRddxNjPALLvJf05EZsrmOMx5TSBjjlMzO7vyhomqYGdsBS0uFc4px7Gzwhg/OcUkobSQfgvSiKu38FA3AvMbPbsix/JKU/J1yBAUJVVd+SEpx94wh4773f5kUvmAP3ghDCysw+p8IADiDGWMyBe4GkIcFFGMCFEFbAeg4MsIgxFlL/ll+S2pRS673/uAYDLJxza+BlCpTnF+Npcx+5gyM3AAAAAElFTkSuQmCC'}))
};
