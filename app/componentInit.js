module.exports = (vnode) => {
    const vm = {};
    vm.stateman = vnode.attrs.stateman;
    vm.fetcher = vnode.attrs.fetcher;
    vm.globals = vm.stateman.get('globals');
    vm.sections = vnode.attrs.sections;
    vm.section = {};
    return vm;
};