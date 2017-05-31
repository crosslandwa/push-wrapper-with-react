import {clone} from '../reducers/utils'

const emptyTrack = (id, length = 32) => ({
  id,
  stepIds: [...Array(length).keys()].map(x => 'emptyStep')
})

const intialState = { byId: {}, allIds: [] }

export default function tracks (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE':
      return addTracks(state, action.trackIds)
  }
  return state
}

function addTracks (state, ids) {
  return {
    byId: ids.reduce((byId, id) => {
      byId[id] = emptyTrack(id)
      return byId
    }, clone(state.byId)),
    allIds: state.allIds.concat(ids)
  }
}
