import {playSample} from '../voices/actions'

export const TOGGLE_RAINBOW = 'TOGGLE_RAINBOW'
export const TOGGLE_SEQUENCE = 'TOGGLE_SEQUENCE'
export const ADVANCE_SEQUENCE = 'ADVANCE_SEQUENCE'

export function toggleRainbow (index) {
  return { type: TOGGLE_RAINBOW, index }
}

export function toggleSequence (key, index) {
  return { type: TOGGLE_SEQUENCE, sequence: key, index }
}

export function stopSequence () {
  return dispatch => {
    dispatch({ type: 'SEQUENCE_STOP' })
  }
}

export function startSequence (step = 0) {
  return (dispatch, getState) => {
    const { sequences: { playing } } = getState()
    if (!playing) {
      dispatch({ type: 'SEQUENCE_START', step })
      dispatch(advanceSequence())
    } else {
      dispatch({ type: 'SEQUENCE_NEXT_STEP', step })
    }
  }
}

function advanceSequence () {
  return (dispatch, getState) => {
    const { sequences: { playing } } = getState()
    if (!playing) return
    dispatch({ type: ADVANCE_SEQUENCE })
    return dispatch(playSequencedVoices())
  }
}

function playSequencedVoices  () {
  return (dispatch, getState) => {
    const { sequences, sequences: { currentStep } } = getState();
    ['kick', 'snare', 'hat'].forEach((key, index) => {
      if (sequences[key].toggles[currentStep]) {
        dispatch(playSample(index))
      }
    })
    setTimeout(() => dispatch(advanceSequence()), 125)
  }
}
