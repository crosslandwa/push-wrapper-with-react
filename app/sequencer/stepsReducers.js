import {clone} from '../reducers/utils'

const step = (id, pitch = null, velocity = null, decay = null) => ({
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
      return removeStep(state, action)
    case 'STEP_UPDATE_PITCH':
      return updatePitch(state, action)
    case 'STEP_UPDATE_VELOCITY':
      return updateVelocity(state, action.id, action.velocity)
    case 'STEPS_UPDATE_DECAY':
      return updateParamBatch(state, 'voiceDecay', action.ids, action.values)
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

function updatePitch(state, {id, pitch}) {
  const updated = clone(state)
  updated.byId[id].midiPitch = pitch
  return updated
}

function updateVelocity(state, id, velocity) {
  const updated = clone(state)
  updated.byId[id].midiVelocity = velocity
  return updated
}

function addStep(state, {id, pitch, velocity}) {
  const updated = clone(state)
  updated.byId[id] = step(id, pitch, velocity || 100)
  updated.allIds.push(id)
  return updated
}

function removeStep(state, {id}) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(x => x !== id)
  return updated
}
