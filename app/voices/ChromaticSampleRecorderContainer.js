'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { recordStep } from '../sequencer/actions'
import { playVoiceForTrack } from './actions'
import ChromaticKeyboardPad from './ChromaticKeyboardPad'

const ChromaticSampleRecorderContainer = (props) => <ChromaticKeyboardPad {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId, pitch }) => ({
    padPressed (velocity) {
      const recordedStepNumber = dispatch(recordStep(trackId, { pitch, velocity }))
      dispatch(playVoiceForTrack(trackId, {pitch, velocity}))
    }
  })
)(ChromaticSampleRecorderContainer)
