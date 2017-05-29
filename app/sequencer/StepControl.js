'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { toggleStep } from './actions'
import StepDisplay from './StepDisplay'

const StepControl = (props) => <StepDisplay {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice }) => ({
    onClick (index) {
      dispatch(toggleStep(voice, index))
    }
  })
)(StepControl)
