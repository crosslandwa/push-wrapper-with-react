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
    onClick (stepNumber, stepId) {
      let selectedStepId = stepId
      if (stepId === 'emptyStep') {
        selectedStepId = dispatch(turnStepOn(voice, stepNumber)) // omitted optional pitch, velocity
        dispatch(enterStepEditMode(voice, selectedStepId))
      }
      dispatch(selectStep(voice, selectedStepId))
    },
    onRelease (stepNumber, stepId, underEdit) { // TODO remove pasing stepNumber
      if (!underEdit) dispatch(turnStepOff(stepId))
      dispatch(unselectStep(voice, stepId))
      dispatch(exitStepEditMode(voice, stepId))
    }
  })
)(StepControl)
