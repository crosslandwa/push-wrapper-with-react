import { clone } from '../reducers/utils'

const initialVoiceState = {}

const initialState = {
  byId: {},
  allIds: []
}

export default function voices (state = initialState, action) {
  switch (action.type) {
    case 'VOICE_PLAYING':
      return voicePlaying(state, action)
    case 'KIT_CREATE':
      return createVoices(state, action.voiceIds, action.sampleIds)
    case 'VOICE_SWITCH_SAMPLE':
      return switchSample(state, action.voiceId, action.sampleId)
    case 'VOICE_UPDATE_PITCH':
      return updatePitch(state, action.id, action.pitch)
    case 'VOICE_UPDATE_DECAY':
      return updateDecay(state, action.id, action.decay)
  }
  return state
}

function voicePlaying (state = [], {id, velocity = 0}) {
  const updated = clone(state)
  updated.byId[id].velocity = velocity
  return updated
}

function createVoices (state, ids, sampleIds) {
  return {
    byId: ids.reduce((byId, id, index) => {
      byId[id] = {
        id,
        sampleId: sampleIds[index],
        pitch: 36,
        velocity: 0,
        decay: 100
      }
      return byId
    }, clone(state.byId)),
    allIds: state.allIds.concat(ids)
  }
}

function switchSample(state, id, sampleId) {
  const updated = clone(state)
  updated.byId[id].sampleId = sampleId
  return updated
}

function updatePitch(state, id, pitch) {
  const updated = clone(state)
  updated.byId[id].pitch = pitch
  return updated
}

function updateDecay(state, id, decay = 100) {
  const updated = clone(state)
  updated.byId[id].decay = decay
  return updated
}
