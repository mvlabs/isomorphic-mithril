import safeGet from 'lodash.get'
import safeSet from 'lodash.set'

const stateman = (initialState = {}) => {
  const state = JSON.parse(JSON.stringify(initialState))

  return {
    // Safe return values, even if the path does not exist,
    // without throwing an error and providing a default value
    get: field => safeGet(state, field, null),

    // Safe set the field with the value provided, even if the path does not exist
    // ie: try to set state.flags.list if state.flags doesn't exist
    set: (field, value) => {
      safeSet(state, field, value)
    },

    // Get a snapshot of the state
    getState: () => state
  }
}

export default stateman
