'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from './actions'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'

const ChromaticSamplePlayerContainer = ({ padPressed, pad, rgb = Colours.white }) => (
  <PushGridPad
    rgb={rgb}
    pad={pad}
    padPressed={padPressed}
  >
    <DomGridPad
      padPressed={padPressed}
      active={true}
      rgb={rgb}
    />
  </PushGridPad>
)

export default connect(
  state => ({}),
  (dispatch, { trackId, pitch, padPressed }) => ({
    padPressed (velocity) {
      dispatch(playVoiceForTrack(trackId, {pitch, velocity}))
      padPressed && padPressed(velocity)
    }
  })
)(ChromaticSamplePlayerContainer)
