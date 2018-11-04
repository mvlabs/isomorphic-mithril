import m from 'mithril'
import translatejs from 'translate.js'

const options = {
  debug: true, // [Boolean]: Logs missing translations to console and add "@@" around output, if `true`.
  array: false, // [Boolean]: Returns translations with placeholder-replacements as Arrays, if `true`.
  resolveAliases: false // [Boolean]: Parses all translations for aliases and replaces them, if `true`.
}

const i18n = messages => (key, args) => {
  const t = translatejs(messages, options)
  return args ? m.trust(t(key, args)) : t(key)
}

export default i18n
