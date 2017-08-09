import { selectTrack } from '../ui/actions'
import { currentKit, patternIds, patternSelector, sampleIds, trackIds, selectedTrackIndex } from '../selectors'

function createPatternWithCurrentKit() {
  return (dispatch, getState) => dispatch(createThenSelectPattern(currentKit(getState()).id))
}

export function createThenSelectPattern (kitId) {
  return (dispatch, getState) => {
    const allTrackIds = trackIds(getState())
    const patternSampleIds = sampleIds(getState())
    const id = `pattern${patternIds(getState()).length}`
    const patternTrackIds = patternSampleIds.map((sampleId, x) => `track${allTrackIds.length + x}`)
    dispatch({
      type: 'PATTERN_CREATE_THEN_SELECT',
      id,
      patternId: id,
      kitId,
      sampleIds: patternSampleIds,
      trackIds: patternTrackIds
    })
    dispatch(selectTrack(patternTrackIds[0]))
    return id
  }
}

// used in initialisation still to select first pattern
export function selectPattern (id) {
  return (dispatch, getState) => {
    const pattern = patternSelector(getState(), id)
    const index = selectedTrackIndex(getState())
    dispatch({ type: 'PATTERN_SELECT', id })
    dispatch(selectTrack(pattern.trackIds[Math.max(index, 0)]))
  }
}

export function createOrCopyThenSelectPattern (patternId) {
  return (dispatch, getState) => {
    return patternId
      ? dispatch(selectPattern(patternId))
      : dispatch(createPatternWithCurrentKit())
  }
}
