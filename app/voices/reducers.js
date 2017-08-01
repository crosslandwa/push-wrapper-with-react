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
    case 'VOICES_SWITCH_SAMPLE':
      return updateParamBatch(state, 'sampleId', action.ids, action.sampleIds)
    case 'VOICES_UPDATE_PITCH':
      return updateParamBatch(state, 'pitch', action.ids, action.pitches)
    case 'VOICES_UPDATE_DECAY':
      return updateParamBatch(state, 'decay', action.ids, action.decays)
    case 'VOICES_UPDATE_FILTER_FREQ':
      return updateParamBatch(state, 'filterAmount', action.ids, action.filterAmounts)
    case 'VOICES_UPDATE_VOLUME':
      return updateParamBatch(state, 'midiVolume', action.ids, action.midiVolumes)
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
        filterAmount: 127,
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
