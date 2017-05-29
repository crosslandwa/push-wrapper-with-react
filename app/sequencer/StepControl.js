'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {
  turnStepOff,
  turnStepOn,
  enterStepEditMode,
  exitStepEditMode,
  selectStep,
  unselectStep
} from './actions'
import StepDisplay from './StepDisplay'

const StepControl = (props) => <StepDisplay {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice }) => ({
    onClick (step, currentStep) {
      dispatch(selectStep(voice, step))
      if (currentStep.midiVelocity === null) {
        dispatch(turnStepOn(voice, step)) // omitted optional pitch, velocity
        dispatch(enterStepEditMode(voice, step))
      }
    },
    onRelease (step, underEdit) {
      if (!underEdit) dispatch(turnStepOff(voice, step))
      dispatch(unselectStep(voice, step))
      dispatch(exitStepEditMode(voice, step))
    }
  })
)(StepControl)
