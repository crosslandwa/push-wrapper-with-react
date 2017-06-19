import { selectTrack } from '../ui/actions'
import { switchPlayerToTrack } from '../voices/actions'
import { patternIds, patternSelector, sampleIds } from '../selectors'

export function createPattern () {
  return (dispatch, getState) => {
    const {entities: {
      tracks: {allIds: allTrackIds},
      voices: {allIds: allVoiceIds}
    }} = getState()
    const patternSampleIds = sampleIds(getState())
    const id = `pattern${patternIds(getState()).length}`
    const voiceIds = patternSampleIds.map((sampleId, x) => `voice${allVoiceIds.length + x}`)
    const trackIds = patternSampleIds.map((sampleId, x) => `track${allTrackIds.length + x}`)
    dispatch({ type: 'PATTERN_CREATE', id, sampleIds: patternSampleIds, trackIds, voiceIds })
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
