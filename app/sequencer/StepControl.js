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
    onClick (stepNumber, stepId, currentStepVelocity) {
      let stepIdToSelect
      if (currentStepVelocity === null) {
        stepIdToSelect = dispatch(turnStepOn(voice, stepNumber)) // omitted optional pitch, velocity
        dispatch(enterStepEditMode(voice, stepIdToSelect))
      }
      dispatch(selectStep(voice, stepIdToSelect || stepId))
    },
    onRelease (stepNumber, stepId, underEdit) { // TODO remove pasing stepNumber
      if (!underEdit) dispatch(turnStepOff(stepId))
      dispatch(unselectStep(voice, stepId))
      dispatch(exitStepEditMode(voice, stepId))
    }
  })
)(StepControl)
