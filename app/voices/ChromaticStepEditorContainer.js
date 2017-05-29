'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { enterStepEditMode, turnStepOn } from '../sequencer/actions'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'

const ChromaticStepEditorContainer = (props) => <ChromaticSamplePlayerContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice, selectedStep, pitch }) => ({
    padPressed (velocity) {
      dispatch(enterStepEditMode(voice, selectedStep))
      dispatch(turnStepOn(voice, selectedStep, pitch)) // TODO should retain existing velocity?
    }
  })
)(ChromaticStepEditorContainer)
