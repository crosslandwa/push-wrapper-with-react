const step = (pitch = null, velocity = null) => ({
  midiPitch: pitch,
  midiVelocity: velocity
})

const intialState = {
  byId: { emptyStep: step()},
  allIds: ['emptyStep']
}

export default function steps (state = intialState, action) {
  switch (action.type) {
    case 'SEQUENCER_STEP_ON':
    case 'SEQUENCER_STEP_OFF':
      return 'SEQUENCER_STEP_ON' === action.type
        ? addStep(state, action)
        : removeStep(state, action)
  }
  return state
}

function addStep(state, {id, pitch, velocity}) {
  const updated = JSON.parse(JSON.stringify(state))
  updated.byId[id] = step(pitch, velocity || 100)
  updated.allIds.push(id)
  return updated
}

function removeStep(state, {id}) {
  const updated = JSON.parse(JSON.stringify(state))
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(x => x !== id)
  return updated
}
