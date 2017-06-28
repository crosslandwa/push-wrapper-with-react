'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { updateSelectedStepPitch } from '../sequencer/actions'
import { playVoiceForTrack } from './actions'
import ChromaticKeyboardPad from './ChromaticKeyboardPad'

const ChromaticStepEditorContainer = (props) => <ChromaticKeyboardPad {...props} />

export default connect(
  state => ({}),
  (dispatch, { pitch, trackId }) => ({
    padPressed (velocity) {
      dispatch(updateSelectedStepPitch(pitch))
      dispatch(playVoiceForTrack(trackId, {pitch, velocity}))
    }
  })
)(ChromaticStepEditorContainer)
