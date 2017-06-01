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
    case 'STEP_TURN_OFF':
      return removeStep(state, action.id)
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
  const updated = clone(state)
  updated.byId[trackId].stepIds[stepNumber] = stepId
  return updated
}

function removeStep (state, stepId) {
  const updated = clone(state)
  updated.allIds.forEach(trackId => {
    const stepIds = updated.byId[trackId].stepIds
    if (stepIds.includes(stepId)) {
      stepIds[stepIds.indexOf(stepId)] = null
    }
  })
  return updated
}
