'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { recordStep } from '../sequencer/actions'
import SamplePlayerContainer from './SamplePlayerContainer'

const SampleRecorderContainer = (props) => <SamplePlayerContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice, pitch }) => ({
    padPressed (velocity) {
      dispatch(recordStep(voice, velocity))
    }
  })
)(SampleRecorderContainer)
