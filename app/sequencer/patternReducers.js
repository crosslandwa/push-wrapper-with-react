import {clone} from '../reducers/utils'

const intialState = { byId: {}, allIds: [] }

export default function patterns (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE':
      return addPattern(state, action.id, action.kitId, action.trackIds)
    case 'KIT_COPY':
    case 'PATTERN_SELECT_KIT':
      return selectKit(state, action.patternId, action.kitId)
  }
  return state
}

function addPattern (state, id, kitId, trackIds) {
  return {
    byId: Object.assign({}, state.byId, {[id]: {id, kitId, trackIds}}),
    allIds: state.allIds.concat(id)
  }
}

function selectKit(state, patternId, kitId) {
  const updated = clone(state)
  updated.byId[patternId].kitId = kitId
  return updated
}
