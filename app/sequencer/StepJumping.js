'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { startSequence } from './actions'
import StepDisplay from './StepDisplay'

const StepJumping = (props) => <StepDisplay {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice }) => ({
    onClick (index) {
      dispatch(startSequence(index))
    }
  })
)(StepJumping)
