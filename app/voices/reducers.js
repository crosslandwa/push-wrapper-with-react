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
    case 'VOICE_UPDATE_FILTER_F':
      return updateFilterF(state, action.id, action.filterAmount)
    case 'VOICE_UPDATE_VOLUME':
      return updateParam(state, action.id, 'midiVolume', action.midiVolume)
    case 'VOICE_MUTE_ON':
      return updateParam(state, action.id, 'muted', true)
    case 'VOICE_MUTE_OFF':
      return updateParam(state, action.id, 'muted', false)
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
        decay: 100,
        filterAmount: 100,
        midiVolume: 108,
        muted: false
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

function updateFilterF(state, id, filterAmount = 100) {
  const updated = clone(state)
  updated.byId[id].filterAmount = filterAmount
  return updated
}

function updateParam(state, id, param, value) {
  const updated = clone(state)
  updated.byId[id][param] = value
  return updated
}
