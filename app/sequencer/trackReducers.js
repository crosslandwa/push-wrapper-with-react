import {clone} from '../reducers/utils'

const emptyTrack = (id, length = 32) => ({
  id,
  numberOfSteps: length,
  stepIds: []
})

const intialState = { byId: {}, allIds: [] }

export default function tracks (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE':
      return addTracks(state, action.trackIds)
    case 'STEP_TURN_ON':
      return addStep(state, action.trackId, action.id, action.stepNumber)
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

function addStep (state, trackId, stepId, stepNumber) {
  const track = state.byId[trackId]
  const updated = {
    id: track.id,
    stepIds: track.stepIds.slice()
  }
  updated.stepIds[stepNumber] = stepId
  return updated
}
