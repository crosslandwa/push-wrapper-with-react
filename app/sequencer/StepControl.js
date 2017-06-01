'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { turnStepOn, selectStep, unselectStep } from './actions'
import StepDisplay from './StepDisplay'

const StepControl = (props) => <StepDisplay {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId }) => ({
    onClick (stepNumber, stepId) {
      let selectedStepId = stepId
      if (!stepId) {
        selectedStepId = dispatch(turnStepOn(trackId, stepNumber)) // omitted optional pitch, velocity
      }
      dispatch(selectStep(selectedStepId))
    },
    onRelease (stepId) {
      dispatch(unselectStep(stepId))
    }
  })
)(StepControl)
