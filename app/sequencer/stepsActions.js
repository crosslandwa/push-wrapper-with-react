import { currentVoice, selectedStep } from '../selectors'

const clamp = (min, max) => x => Math.max(min, Math.min(x, max))
const clampBetween1And100 = clamp(1, 100)
const clampBetween1And127 = clamp(1, 127)

const selectedSteps = (state) => [selectedStep(state)] // TODO select and edit multiple steps

export function resetSelectedStepsPitch () {
  return (dispatch, getState) => {
    dispatch({
      type: 'STEPS_RESET_PITCH',
      ids: selectedSteps(getState()).map(step => step.id)
    })
  }
}

export function changeStepPitchBy(delta) {
  return (dispatch, getState) => {
    const steps = selectedSteps(getState())
    const voice = currentVoice(getState())
    return dispatch(updateStepPitch(
      steps.map(step => step.id),
      steps.map(step => (step.midiPitch || voice.pitch) + delta)
    ))
  }
}

export function changeStepDecayBy (delta) {
  return (dispatch, getState) => {
    const steps = selectedSteps(getState())
    const voice = currentVoice(getState())
    dispatch({
      type: 'STEPS_UPDATE_DECAY',
      ids: steps.map(step => step.id),
      values: steps.map(step => clampBetween1And100((step.voiceDecay || voice.decay) + delta)) // TODO duplication of decay limits
    })
  }
}

export function changeStepVelocityBy(delta) {
  return (dispatch, getState) => {
    const steps = selectedSteps(getState())
    return dispatch({
      type: 'STEPS_UPDATE_VELOCITY',
      ids: steps.map(step => step.id),
      values: steps.map(step => clampBetween1And127(step.midiVelocity + delta)) // TODO duplication of velocity limits
    })
  }
}

function updateStepPitch(ids, pitches) {
  return { type: 'STEPS_UPDATE_PITCH', ids, values: pitches }
}

export function updateSelectedStepPitch(pitch) {
  return (dispatch, getState) => dispatch(updateStepPitch([selectedStep(getState()).id], [pitch]))
}
