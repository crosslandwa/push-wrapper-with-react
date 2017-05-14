import {playSample} from '../voices/actions'

export function toggleSequence (voice, step) {
  return { type: 'TOGGLE_SEQUENCE', voice, step }
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
    sequencer.voices.forEach((voice, index) => {
      if (voice.toggles[currentStep]) {
        dispatch(playSample(index))
      }
    })
    setTimeout(() => dispatch(advanceSequence()), 125)
  }
}
