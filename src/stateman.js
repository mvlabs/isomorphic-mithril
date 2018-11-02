import safeGet from 'lodash.get'
import safeSet from 'lodash.set'

let state
const listeners = []

const stateman = {
  init: (initialState) => {
    state = JSON.parse(JSON.stringify(initialState)) || {}
  },

  // Safe return values, even if the path does not exist,
  // without throwing an error and providing a default value
  get: field => safeGet(state, field, null),

  // Safe set the field with the value provided, even if the path does not exist
  // ie: try to set state.flags.list if state.flags doesn't exist
  set: (field, value) => {
    safeSet(state, field, value)
    // Filter listeners that doesn't belong to that field
    listeners.filter(elem => elem.field === field).forEach(elem => elem.cb(stateman.get(field)))
  },

  addListener: (field, cb) => {
    // Adds a listener to a field, return a function to usubscribe to the listener
    const obj = {
      field: field,
      cb: cb
    }
    if (typeof cb !== 'function') {
      throw new Error('callback should be a function')
    }
    listeners.push(obj)
    return function unsubscribe () {
      const index = listeners.indexOf(obj)
      // Check if this listener hasn't been unsubscribed
      if (index > -1) listeners.splice(index, 1)
    }
  },

  // Only needed for server side rendering, do not use client side
  _getString: () => JSON.stringify(state)
}

export default stateman
