import {playSample} from '../voices/actions'

export function toggleRainbow (index) {
  return { type: 'TOGGLE_RAINBOW', index }
}

export function toggleSequence (key, index) {
  return { type: 'TOGGLE_SEQUENCE', sequence: key, index }
}

export function stopSequence () {
  return dispatch => {
    dispatch({ type: 'SEQUENCE_STOP' })
  }
}

export function startSequence (step = 0) {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
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
    const { sequencer: { playing } } = getState()
    if (!playing) return
    dispatch({ type: 'ADVANCE_SEQUENCE' })
    return dispatch(playSequencedVoices())
  }
}

function playSequencedVoices  () {
  return (dispatch, getState) => {
    const { sequencer, sequencer: { currentStep } } = getState();
    ['kick', 'snare', 'hat'].forEach((key, index) => {
      if (sequencer[key].toggles[currentStep]) {
        dispatch(playSample(index))
      }
    })
    setTimeout(() => dispatch(advanceSequence()), 125)
  }
}
