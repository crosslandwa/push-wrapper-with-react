import { currentPattern, modifiersDuplicateSelector, sampleIds, voicesForCurrentKit, voicesForKit } from '../selectors'

function createKit (kitIndex, sampleIds) {
  return (dispatch, getState) => {
    const id = `kit-${kitIndex}`
    // knowledge here that we have eight voices per kit
    const kitVoiceIds = sampleIds.map((sampleId, x) => `voice-${kitIndex * 8 + x}`)

    dispatch({ type: 'KIT_CREATE', id, voiceIds: kitVoiceIds, sampleIds })
    return id
  }
}

export function createDefaultKits () {
  return (dispatch, getState) => {
    const defaultSampleIds = sampleIds(getState()).slice(0, 8)
    return Promise.all([...Array(8).keys()].map(index => dispatch(createKit(index, defaultSampleIds))))
  }
}

export function copyIfDuplicateHeldThenSelectKitForCurrentPattern (kitId) {
  return (dispatch, getState) => {
    const patternId = currentPattern(getState()).id
    modifiersDuplicateSelector(getState())
      ? dispatch({
        type: 'KIT_COPY',
        sourceVoices: voicesForCurrentKit(getState()),
        targetVoiceIds: voicesForKit(getState(), kitId).map(voice => voice.id),
        kitId,
        patternId
      })
      : dispatch({
        type: 'PATTERN_SELECT_KIT',
        kitId,
        patternId
      })
  }
}
