import {clone} from '../reducers/utils'

const intialState = { byId: {}, allIds: [] }

export default function patterns (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE':
      return addPattern(state, action.id, action.trackIds)
  }
  return state
}

function addPattern (state, id, trackIds) {
  return {
    byId: Object.assign({}, state.byIds, {[id]: {id, trackIds}}),
    allIds: state.allIds.concat(id)
  }
  // const updated = clone(state)
  // updated.byId.id = {id, trackIds}
  // updated.allIds = updated.allIds.concat(id)
  // return updated
}
