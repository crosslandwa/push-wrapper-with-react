import { currentKit, currentPattern, kitIds, modifiersDuplicateSelector, sampleIds, voiceIds, voicesForCurrentKit, voicesForKit } from '../selectors'

// TODO this can be converted to initialise kits (x8) as there is no dynamic creation of kits
export function createKit (sampleIds) {
  return (dispatch, getState) => {
    const allVoiceIds = voiceIds(getState())
    const kitVoiceIds = sampleIds.map((sampleId, x) => `voice-${allVoiceIds.length + x}`)

    const id = `kit-${kitIds(getState()).length}`
    dispatch({ type: 'KIT_CREATE', id, voiceIds: kitVoiceIds, sampleIds })
    return id
  }
}

export function createDefaultKit () {
  return (dispatch, getState) => {
    return dispatch(createKit(sampleIds(getState()).slice(0, 8)))
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
