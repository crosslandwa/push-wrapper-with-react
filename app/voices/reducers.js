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
      return updateParam(state, action.voiceId, 'sampleId', action.sampleId)
    case 'VOICE_UPDATE_PITCH':
      return updateParam(state, action.id, 'pitch', action.pitch)
    case 'VOICE_UPDATE_DECAY':
      return updateParam(state, action.id, 'decay', action.decay)
    case 'VOICE_UPDATE_FILTER_F':
      return updateParam(state, action.id, 'filterAmount', action.filterAmount)
    case 'VOICE_UPDATE_FILTER_FREQS':
      return updateParamBatch(state, 'filterAmount', action.ids, action.filterAmounts)
    case 'VOICE_UPDATE_VOLUME':
      return updateParam(state, action.id, 'midiVolume', action.midiVolume)
  }
  return state
}

function updateParamBatch (state, param, ids, values) {
  const updated = clone(state)
  ids.forEach((id, index) => {
    updated.byId[id][param] = values[index]
  })
  return updated
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
        midiVolume: 108
      }
      return byId
    }, clone(state.byId)),
    allIds: state.allIds.concat(ids)
  }
}

function updateParam(state, id, param, value) {
  const updated = clone(state)
  updated.byId[id][param] = value
  return updated
}
