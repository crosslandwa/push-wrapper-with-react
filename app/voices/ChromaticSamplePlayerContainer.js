'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from './actions'
import ChromaticKeyboardPad from './ChromaticKeyboardPad'

const ChromaticSamplePlayerContainer = (props) => <ChromaticKeyboardPad {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId, pitch }) => ({
    padPressed (velocity) {
      dispatch(playVoiceForTrack(trackId, {pitch, velocity}))
    }
  })
)(ChromaticSamplePlayerContainer)
