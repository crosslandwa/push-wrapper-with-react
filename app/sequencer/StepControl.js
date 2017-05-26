'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { toggleStep } from './actions'
import StepDisplay from './StepDisplay'

const StepJumping = (props) => <StepDisplay {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice }) => ({
    onClick (index) {
      dispatch(toggleStep(voice, index))
    }
  })
)(StepJumping)
