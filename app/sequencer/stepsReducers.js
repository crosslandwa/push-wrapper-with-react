const intialState = {
  byId: { emptyStep: {
    midiPitch: null,
    midiVelocity: null
  }},
  allIds: ['emptyStep']
}

export default function steps (state = intialState, action) {
  switch (action.type) {
    case 'XXX':
      return state
  }
  return state
}
