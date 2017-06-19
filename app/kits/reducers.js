import { clone } from '../reducers/utils'

const initialKitState = {}

const initialState = {
  byId: {},
  allIds: []
}

export default function voices (state = initialState, action) {
  switch (action.type) {
    case 'KIT_CREATE':
      return addKit(state, action.id, action.voiceIds)
  }
  return state
}

function addKit (state, id, voiceIds) {
  return {
    byId: Object.assign({}, state.byId, {[id]: {id, voiceIds}}),
    allIds: state.allIds.concat(id)
  }
}
