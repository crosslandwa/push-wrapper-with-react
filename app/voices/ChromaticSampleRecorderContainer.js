'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { recordStep } from '../sequencer/actions'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'

const ChromaticSampleRecorderContainer = (props) => <ChromaticSamplePlayerContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice, pitch }) => ({
    padPressed (velocity) {
      dispatch(recordStep(voice, { pitch, velocity }))
    }
  })
)(ChromaticSampleRecorderContainer)
