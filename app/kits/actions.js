import { kitIds, voiceIds } from '../selectors'

export function createKit (sampleIds) {
  return (dispatch, getState) => {
    const allVoiceIds = voiceIds(getState())
    const kitVoiceIds = sampleIds.map((sampleId, x) => `voice-${allVoiceIds.length + x}`)

    const id = `kit-${kitIds(getState()).length}`
    dispatch({ type: 'KIT_CREATE', id, voiceIds: kitVoiceIds, sampleIds })
    return id
  }
}
