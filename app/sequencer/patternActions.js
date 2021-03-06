import { turnStepsOff } from './actions'
import { selectTrack } from '../ui/actions'
import { clone } from '../reducers/utils'
import { currentKit, currentPattern, patternIds, patternSelector, sampleIds, selectedTrackIndex, stepSelector, trackSelector } from '../selectors'
import { modifiersDeleteSelector, modifiersDuplicateSelector } from '../selectors'
const deleteButtonPressed = modifiersDeleteSelector
const duplicateButtonPressed = modifiersDuplicateSelector
const nonNull = x => x !== null


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

function deletePattern (patternId) {
  return (dispatch, getState) => {
    const pattern = patternSelector(getState(), patternId)
    dispatch(deleteStepsForPattern(pattern.id))
    dispatch({
      type: 'PATTERN_DELETE',
      id: pattern.id,
      trackIds: pattern.trackIds
    })
  }
}

function deleteStepsForPattern (patternId) {
  return (dispatch, getState) => {
    const pattern = patternSelector(getState(), patternId)
    const tracks = pattern.trackIds.map(id => trackSelector(getState(), id))
    const stepIds = tracks.reduce((acc, it) => acc.concat(it.stepIds), []).filter(nonNull)
    dispatch(turnStepsOff(stepIds))
  }
}

function copyCurrentPattern (targetPatternId) {
  return (dispatch, getState) => {

    // does this belong in reducer? there's a lot of knowledge of state shape here
    const state = getState()
    const originalPattern = currentPattern(state)
    const newPatternId = targetPatternId || `p-${patternIds(state).length}`
    const updateId = id => id ? id.replace(originalPattern.id, newPatternId) : id

    const newPattern = Object.assign(clone(originalPattern), { id: newPatternId })
    newPattern.trackIds = newPattern.trackIds.map(updateId)

    const originalTracks = originalPattern.trackIds.map(id => trackSelector(state, id))

    const newTracks = clone(originalTracks)
      .map(track => Object.assign(track, { id: updateId(track.id), stepIds: track.stepIds.map(updateId) }))

    const originalSteps = originalTracks
      .reduce((acc, track) => acc.concat(track.stepIds), [])
      .filter(nonNull)
      .map(stepId => stepSelector(state, stepId))

    const newSteps = clone(originalSteps)
      .map(step => Object.assign(step, { id: updateId(step.id) }))

    if (targetPatternId) {
      dispatch(deleteStepsForPattern(targetPatternId))
    }
    dispatch({
      type: 'PATTERN_INSERT_NEW',
      pattern: newPattern,
      tracks: newTracks,
      steps: newSteps
    })
    dispatch(selectPattern(newPatternId))
  }
}

export function patternButtonPressed (patternId) {
  return (dispatch, getState) => {
    const state = getState()

    if (currentPattern(state).id === patternId) {
      return
    } else if (patternId && deleteButtonPressed(state)) {
      return dispatch(deletePattern(patternId))
    } else if (duplicateButtonPressed(state)) {
      dispatch(copyCurrentPattern(patternId))
    } else {
      return patternId
        ? dispatch(selectPattern(patternId))
        : dispatch(createPatternWithCurrentKit())
    }
  }
}
