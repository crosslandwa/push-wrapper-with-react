'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { turnStepOn, selectStep, unselectStep } from './actions'
import StepDisplay from './StepDisplay'

const StepControl = (props) => <StepDisplay {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice }) => ({
    onClick (stepNumber, stepId) {
      let selectedStepId = stepId
      if (stepId === 'emptyStep') {
        dispatch(turnStepOn(voice, stepNumber)) // omitted optional pitch, velocity
      }
      dispatch(selectStep(voice, selectedStepId))
    },
    onRelease (stepId) {
      dispatch(unselectStep(voice, stepId))
    }
  })
)(StepControl)
