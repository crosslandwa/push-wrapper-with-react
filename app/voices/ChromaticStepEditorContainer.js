'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { updateSelectedStepPitch } from '../sequencer/actions'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'

const ChromaticStepEditorContainer = (props) => <ChromaticSamplePlayerContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { pitch }) => ({
    padPressed (velocity) {
      dispatch(updateSelectedStepPitch(pitch))
    }
  })
)(ChromaticStepEditorContainer)
