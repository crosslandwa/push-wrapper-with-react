'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { enterStepEditMode, updateStepPitch } from '../sequencer/actions'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'

const ChromaticStepEditorContainer = (props) => <ChromaticSamplePlayerContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice, selectedStepId, pitch }) => ({
    padPressed (velocity) {
      dispatch(enterStepEditMode(voice, selectedStepId))
      dispatch(updateStepPitch(selectedStepId, pitch))
    }
  })
)(ChromaticStepEditorContainer)
