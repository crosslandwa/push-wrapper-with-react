import { clone } from '../reducers/utils'

const initialVoiceState = {
  id: null,
  sampleId: null,
  pitch: 36,
  velocity: 0,
  decay: 100,
  filterAmount: 127,
  midiVolume: 108
}

const initialState = {
  byId: {},
  allIds: []
}

export default function voices (state = initialState, action) {
  switch (action.type) {
    case 'VOICE_PLAYING':
      return updateParamBatch(state, 'velocity', [action.id], [action.velocity])
    case 'KIT_CREATE':
      return createVoices(state, action.voiceIds, action.sampleIds)
    case 'VOICES_SWITCH_SAMPLE':
      return updateParamBatch(state, 'sampleId', action.ids, action.values)
    case 'VOICES_UPDATE_PITCH':
      return updateParamBatch(state, 'pitch', action.ids, action.values)
    case 'VOICES_RESET_PITCH':
      return updateParamBatch(state, 'pitch', action.ids, action.ids.map(id => initialVoiceState.pitch))
    case 'VOICES_UPDATE_DECAY':
      return updateParamBatch(state, 'decay', action.ids, action.values)
    case 'VOICES_RESET_DECAY':
      return updateParamBatch(state, 'decay', action.ids, action.ids.map(id => initialVoiceState.decay))
    case 'VOICES_UPDATE_FILTER_FREQ':
      return updateParamBatch(state, 'filterAmount', action.ids, action.values)
    case 'VOICES_UPDATE_VOLUME':
      return updateParamBatch(state, 'midiVolume', action.ids, action.values)
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

function createVoices (state, ids, sampleIds) {
  return {
    byId: ids.reduce((byId, id, index) => {
      byId[id] = Object.assign({},
        initialVoiceState,
        { id, sampleId: sampleIds[index]}
      )
      return byId
    }, clone(state.byId)),
    allIds: state.allIds.concat(ids)
  }
}
