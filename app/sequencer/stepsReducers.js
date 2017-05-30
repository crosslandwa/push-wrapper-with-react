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
    case 'SEQUENCER_STEP_ON':
    case 'STEP_TURN_OFF':
      return 'SEQUENCER_STEP_ON' === action.type
        ? addStep(state, action)
        : removeStep(state, action)
  }
  return state
}

function addStep(state, {id, pitch, velocity}) {
  const updated = JSON.parse(JSON.stringify(state))
  updated.byId[id] = step(id, pitch, velocity || 100)
  updated.allIds.push(id)
  return updated
}

function removeStep(state, {id}) {
  const updated = JSON.parse(JSON.stringify(state))
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(x => x !== id)
  return updated
}
