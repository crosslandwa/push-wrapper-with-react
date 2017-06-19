import { selectTrack } from '../ui/actions'
import { switchPlayerToTrack } from '../voices/actions'
import { currentKit, patternIds, patternSelector, sampleIds, trackIds } from '../selectors'

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
    dispatch({ type: 'PATTERN_SELECT', id })
    pattern.trackIds.forEach(trackId => dispatch(switchPlayerToTrack(trackId)))
    dispatch(selectTrack(pattern.trackIds[0]))
  }
}
