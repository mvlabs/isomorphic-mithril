import m from 'mithril'
import translatejs from 'translate.js'

const options = {
  debug: true, // [Boolean]: Logs missing translations to console and add "@@" around output, if `true`.
  array: false, // [Boolean]: Returns translations with placeholder-replacements as Arrays, if `true`.
  resolveAliases: false // [Boolean]: Parses all translations for aliases and replaces them, if `true`.
}

let messages = {}

const translate = (key, args) => {
  const t = translatejs(messages, options)
  return args ? m.trust(t(key, args)) : t(key)
}

translate.init = (data) => {
  if (data) messages = data
}

translate.getTranslations = () => messages

export default translate
