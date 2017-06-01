import { clone } from '../reducers/utils'

const initialVoiceState = {}

const initialState = {
  byId: {},
  allIds: []
}

export default function voices (state = initialState, action) {
  switch (action.type) {
    case 'SAMPLE_PLAYING':
      return voicePlaying(state, action)
    case 'VOICE_CREATE':
      return voiceLoaded(state, action)
  }
  return state
}

function voicePlaying (state = [], {id, velocity = 0}) {
  const updated = clone(state)
  updated.byId[id].velocity = velocity
  return updated
}

function voiceLoaded (state, {id, sampleId}) {
  const updated = clone(state)
  updated.byId[id] = {
    id,
    sampleId,
    pitch: 36,
    velocity: 0
  }
  updated.allIds = updated.allIds.concat(id)
  return updated
}
