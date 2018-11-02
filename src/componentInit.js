export default (va) => {
  const vm = {}
  vm.stateman = va.stateman
  vm.fetcher = va.fetcher
  vm.globals = vm.stateman.get('globals')
  vm.sections = va.sections
  vm.section = {}
  return vm
}
