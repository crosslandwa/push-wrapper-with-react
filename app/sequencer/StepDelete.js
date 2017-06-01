'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { turnStepOff } from './actions'
import StepDisplay from './StepDisplay'

const StepDelete = (props) => <StepDisplay {...props} />

export default connect(
  state => ({}),
  (dispatch, { }) => ({
    onClick (stepNumber, stepId) {
      dispatch(turnStepOff(stepId))
    }
  })
)(StepDelete)
