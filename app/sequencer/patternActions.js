import { selectTrack } from '../ui/actions'
import { currentKit, patternIds, patternSelector, sampleIds, trackIds, selectedTrackIndex } from '../selectors'

export function createPatternWithCurrentKit() {
  return (dispatch, getState) => dispatch(createPattern(currentKit(getState()).id))
}

export function createPattern (kitId) {
  return (dispatch, getState) => {
    const allTrackIds = trackIds(getState())
    const patternSampleIds = sampleIds(getState())
    const id = `pattern${patternIds(getState()).length}`
    const patternTrackIds = patternSampleIds.map((sampleId, x) => `track${allTrackIds.length + x}`)
    dispatch({
      type: 'PATTERN_CREATE',
      id,
      kitId,
      sampleIds: patternSampleIds,
      trackIds: patternTrackIds
    })
    return id
  }
}

export function selectPattern (id) {
  return (dispatch, getState) => {
    const pattern = patternSelector(getState(), id)
    const index = selectedTrackIndex(getState())
    dispatch({ type: 'PATTERN_SELECT', id })
    dispatch(selectTrack(pattern.trackIds[Math.max(index, 0)]))
  }
}
