'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { recordStep } from '../sequencer/actions'
import SamplePlayerContainer from './SamplePlayerContainer'

const SampleRecorderContainer = (props) => <SamplePlayerContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId }) => ({
    padPressed (velocity) {
      dispatch(recordStep(trackId, { velocity }))
    }
  })
)(SampleRecorderContainer)
