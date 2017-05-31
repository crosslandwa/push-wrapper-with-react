const clone = x => JSON.parse(JSON.stringify(x))
const step = (id, pitch = null, velocity = null) => ({
  id,
  midiPitch: pitch,
  midiVelocity: velocity
})

const intialState = {
  byId: { emptyStep: step('emptyStep')},
  allIds: ['emptyStep']
}

export default function steps (state = intialState, action) {
  switch (action.type) {
    case 'STEP_TURN_ON':
      return addStep(state, action)
    case 'STEP_TURN_OFF':
      return removeStep(state, action)
    case 'STEP_UPDATE_PITCH':
      return updatePitch(state, action)
  }
  return state
}

function updatePitch(state, {id, pitch}) {
  const updated = clone(state)
  updated.byId[id].midiPitch = pitch
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
