import { arrayFillOf } from '../reducers/utils'

const initialVoiceState = {
  pitch: 36,
  velocity: 0,
  sample: null
}

const initialState = arrayFillOf(initialVoiceState, 8)

export default function voices (state = initialState, action) {
  switch (action.type) {
    case 'SAMPLE_PLAYING':
      return voicePlaying(state, action)
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

function voiceLoaded (state = [], {voice, sample}) {
  const voices = state.slice()
  voices[voice] = Object.assign({},
    state[voice] ? state[voice] : initialVoiceState,
    { sample }
  )
  return voices
}
