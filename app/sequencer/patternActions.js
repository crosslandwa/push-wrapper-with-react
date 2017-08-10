import { selectTrack } from '../ui/actions'
import { currentKit, modifiersDuplicateSelector, patternIds, patternSelector, sampleIds, trackSelector, selectedTrackIndex } from '../selectors'

const duplicateButtonPressed = modifiersDuplicateSelector

function createPatternWithCurrentKit() {
  return (dispatch, getState) => dispatch(createThenSelectPattern(currentKit(getState()).id))
}

export function createThenSelectPattern (kitId) {
  return (dispatch, getState) => {
    const patternSampleIds = sampleIds(getState())
    const id = `p-${patternIds(getState()).length}`
    const patternTrackIds = patternSampleIds.map((sampleId, x) => `${id}-t-${x}`)
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

function deletePattern (id) {
  return (dispatch, getState) => {
    const targetPattern = patternSelector(getState(), id)
    const tracks = targetPattern.trackIds.map(id => trackSelector(getState(), id))
    const stepIds = tracks.reduce((acc, it) => acc.concat(it.stepIds), []).filter(id => id !== null)
    dispatch({
      type: 'PATTERN_DELETE',
      id,
      trackIds: targetPattern.trackIds,
      stepIds
    })
  }
}

function copyCurrentPattern (targetPatternId) {
  return (dispatch, getState) => {
    if (targetPatternId) {
      dispatch(deletePattern(targetPatternId))
    }
    // foreach track
    // copy all steps (new stepIds)
    // create new track, with stepIds, filling in the nulls
    // collect new tracks
    // create pattern with trackIds
    // select new pattern
  }
}

export function createOrCopyThenSelectPattern (patternId) {
  return (dispatch, getState) => {
    if (duplicateButtonPressed(getState())) {
      dispatch(copyCurrentPattern(patternId))
    } else {
      return patternId
        ? dispatch(selectPattern(patternId))
        : dispatch(createPatternWithCurrentKit())
    }
  }
}
