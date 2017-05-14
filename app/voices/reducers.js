const initialVoiceState = { velocity: 0, sample: '-'}

export default function voices (state = [], action) {
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
