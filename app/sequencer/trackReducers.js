import {clone} from '../reducers/utils'

const intialState = { byId: {}, allIds: [] }

export default function tracks (state = intialState, action) {
  switch (action.type) {
    case 'PATTERN_CREATE_THEN_SELECT':
      return addTracks(state, action.trackIds)
    case 'STEP_TURN_ON':
      return addStep(state, action.trackId, action.id, action.stepNumber)
    case 'STEPS_TURN_OFF':
      return action.ids.reduce((state, id) => removeStep(state, id), state)
    case 'TRACK_UPDATE_NUMBER_OF_STEPS':
      return updateParam(state, action.id, 'numberOfSteps', action.numberOfSteps)
    case 'TRACK_MUTE_ON':
    case 'TRACK_MUTE_OFF':
      return updateParam(state, action.id, 'muted', action.type === 'TRACK_MUTE_ON')
    case 'PATTERN_DELETE':
      return action.trackIds.reduce((state, id) => removeTrack(state, id), state)
    case 'PATTERN_INSERT_NEW':
      return insertTracks(state, action.tracks)

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

function insertTracks (state, tracks) {
  return {
    byId: tracks.reduce((byId, track) => {
      byId[track.id] = track
      return byId
    }, clone(state.byId)),
    allIds: state.allIds.concat(tracks.map(track => track.id))
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

function removeTrack(state, id) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(x => x !== id)
  return updated
}
