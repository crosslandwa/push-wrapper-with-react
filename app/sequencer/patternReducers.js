import {clone} from '../reducers/utils'

const intialState = { byId: {}, allIds: [] }

export default function patterns (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE':
      return addPattern(state, action.id, action.kitId, action.trackIds)
  }
  return state
}

function addPattern (state, id, kitId, trackIds) {
  return {
    byId: Object.assign({}, state.byId, {[id]: {id, kitId, trackIds}}),
    allIds: state.allIds.concat(id)
  }
}
