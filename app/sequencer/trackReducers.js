import {clone} from '../reducers/utils'

const intialState = { byId: {}, allIds: [] }

export default function tracks (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE_THEN_SELECT':
      return addTracks(state, action.trackIds)
    case 'STEP_TURN_ON':
      return addStep(state, action.trackId, action.id, action.stepNumber)
    case 'STEP_TURN_OFF':
      return removeStep(state, action.id)
    case 'TRACK_UPDATE_NUMBER_OF_STEPS':
      return updateParam(state, action.id, 'numberOfSteps', action.numberOfSteps)
    case 'TRACK_MUTE_ON':
    case 'TRACK_MUTE_OFF':
      return updateParam(state, action.id, 'muted', action.type === 'TRACK_MUTE_ON')

  }
  return state
}

function addTracks (state, ids) {
  return {
    byId: ids.reduce((byId, id, index) => {
      byId[id] = {
        id,
        muted: false,
        numberOfSteps: 32,
        stepIds: []
      }
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

function updateParam(state, id, param, value) {
  const updated = clone(state)
  updated.byId[id][param] = value
  return updated
}
