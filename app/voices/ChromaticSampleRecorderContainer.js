'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { realtimeStepRecord } from '../sequencer/actions'
import { playVoiceForTrack } from './actions'
import ChromaticKeyboardPad from './ChromaticKeyboardPad'

const ChromaticSampleRecorderContainer = (props) => <ChromaticKeyboardPad {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId, pitch }) => ({
    padPressed (velocity) {
      dispatch(realtimeStepRecord(trackId, { pitch, velocity }))
      dispatch(playVoiceForTrack(trackId, {pitch, velocity}))
    }
  })
)(ChromaticSampleRecorderContainer)
