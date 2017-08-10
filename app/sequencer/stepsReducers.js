import {clone} from '../reducers/utils'

const initialStepState = {
  id: null,
  decay: null,
  pitch: null,
  velocity: 100
}

const step = (id, pitch = initialStepState.pitch, velocity = initialStepState.velocity, decay = initialStepState.decay) => ({
  id,
  midiPitch: pitch,
  midiVelocity: velocity,
  voiceDecay: decay
})

const intialState = {
  byId: {},
  allIds: []
}

export default function steps (state = intialState, action) {
  switch (action.type) {
    case 'STEP_TURN_ON':
      return addStep(state, action)
    case 'STEP_TURN_OFF':
      return action.ids.reduce((state, id) => removeStep(state, id), state)
    case 'STEPS_UPDATE_PITCH':
      return updateParamBatch(state, 'midiPitch', action.ids, action.values)
    case 'STEPS_RESET_PITCH':
      return updateParamBatch(state, 'midiPitch', action.ids, action.ids.map(id => null))
    case 'STEPS_RESET_VELOCITY':
      return updateParamBatch(state, 'midiVelocity', action.ids, action.ids.map(id => initialStepState.velocity))
    case 'STEPS_UPDATE_VELOCITY':
      return updateParamBatch(state, 'midiVelocity', action.ids, action.values)
    case 'STEPS_RESET_DECAY':
      return updateParamBatch(state, 'voiceDecay', action.ids, action.ids.map(id => null))
    case 'STEPS_UPDATE_DECAY':
      return updateParamBatch(state, 'voiceDecay', action.ids, action.values)
    case 'PATTERN_INSERT_NEW':
      return insertSteps(state, action.steps)
  }
  return state
}

function updateParamBatch (state, param, ids, values) {
  const updated = clone(state)
  ids.forEach((id, index) => {
    updated.byId[id][param] = values[index]
  })
  return updated
}

function addStep(state, {id, pitch, velocity}) {
  const updated = clone(state)
  updated.byId[id] = step(id, pitch, velocity)
  updated.allIds.push(id)
  return updated
}

function insertSteps (state, steps) {
  return {
    byId: steps.reduce((byId, step) => {
      byId[step.id] = step
      return byId
    }, clone(state.byId)),
    allIds: state.allIds.concat(steps.map(step => step.id))
  }
}

function removeStep(state, id) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(x => x !== id)
  return updated
}
