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
    onClick (stepNumber, currentStepVelocity) {
      dispatch(selectStep(voice, stepNumber))
      if (currentStepVelocity === null) {
        dispatch(turnStepOn(voice, stepNumber)) // omitted optional pitch, velocity
        dispatch(enterStepEditMode(voice, stepNumber))
      }
    },
    onRelease (stepNumber, stepId, underEdit) {
      if (!underEdit) dispatch(turnStepOff(stepId))
      dispatch(unselectStep(voice, stepNumber))
      dispatch(exitStepEditMode(voice, stepNumber))
    }
  })
)(StepControl)
