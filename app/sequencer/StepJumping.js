'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { startSequence } from './actions'
import StepControl from './StepControl'

const StepJumping = (props) => <StepControl {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice }) => ({
    onClick (index) {
      dispatch(startSequence(index))
    }
  })
)(StepJumping)
