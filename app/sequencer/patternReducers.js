import {clone} from '../reducers/utils'

const intialState = { byId: {}, allIds: [] }

export default function patterns (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE_THEN_SELECT':
      return addPattern(state, action.id, action.kitId, action.trackIds)
    case 'KIT_COPY_THEN_SELECT':
    case 'PATTERN_SELECT_KIT':
      return selectKit(state, action.patternId, action.kitId)
    case 'PATTERN_DELETE':
      return removePattern(state, action.id)
    case 'PATTERN_INSERT_NEW':
      return addPattern(state, action.pattern.id, action.pattern.kitId, action.pattern.trackIds)
  }
  return state
}

function addPattern (state, id, kitId, trackIds) {
  return {
    byId: Object.assign({}, state.byId, {[id]: {id, kitId, trackIds}}),
    allIds: state.allIds.includes(id) ? state.allIds.slice() : state.allIds.concat(id)
  }
}

function selectKit(state, patternId, kitId) {
  const updated = clone(state)
  updated.byId[patternId].kitId = kitId
  return updated
}

function removePattern(state, id) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(x => x !== id)
  return updated
}
