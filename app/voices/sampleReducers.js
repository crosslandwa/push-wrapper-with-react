import { clone } from '../reducers/utils'

const initialState = {
  byId: {},
  allIds: []
}

export default function samples (state = initialState, action) {
  switch (action.type) {
    case 'SAMPLE_LOADED':
      return voiceLoaded(state, action)
  }
  return state
}

function voicePlaying (state = [], {voice, velocity = 0}) {
  const voices = state.slice()
  voices[voice] = Object.assign({},
    state[voice] ? state[voice] : initialVoiceState,
    { velocity }
  )
  return voices
}

function voiceLoaded (state, {id, sample, url}) {
  const updated = clone(state)
  updated.byId[id] = { id, name: sample, url }
  updated.allIds = updated.allIds.concat(id)
  return updated
}
