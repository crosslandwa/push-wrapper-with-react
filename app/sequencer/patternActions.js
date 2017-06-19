import { selectTrack } from '../ui/actions'
import { switchPlayerToTrack } from '../voices/actions'
import { patternIds, patternSelector, sampleIds, trackIds, voiceIds } from '../selectors'

export function createPattern (kitId) {
  return (dispatch, getState) => {
    const allTrackIds = trackIds(getState())
    const allVoiceIds = voiceIds(getState())
    const patternSampleIds = sampleIds(getState())
    const id = `pattern${patternIds(getState()).length}`
    const patternVoiceIds = patternSampleIds.map((sampleId, x) => `voice${allVoiceIds.length + x}`)
    const patternTrackIds = patternSampleIds.map((sampleId, x) => `track${allTrackIds.length + x}`)
    dispatch({
      type: 'PATTERN_CREATE',
      id,
      kitId,
      sampleIds: patternSampleIds,
      trackIds: patternTrackIds,
      voiceIds: patternVoiceIds
    })
    return id
  }
}

export function selectPattern (id) {
  return (dispatch, getState) => {
    const pattern = patternSelector(getState(), id)
    dispatch({ type: 'PATTERN_SELECT', id })
    pattern.trackIds.forEach(trackId => dispatch(switchPlayerToTrack(trackId)))
    dispatch(selectTrack(pattern.trackIds[0]))
  }
}
