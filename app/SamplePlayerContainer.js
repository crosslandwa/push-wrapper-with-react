'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from './DomGridPad'
import PushGridPad from './PushGridPad'
import { playSample } from './voices/actions'
import { recordStep } from './sequencer/actions'
import { selectVoice } from './ui/actions'

const SamplePlayerContainer = ({ velocity = 0, padPressed, padReleased, pad, rgb = [0, 100, 200]}) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      padReleased={padReleased}
      active={velocity > 0}
      className="pad"
      rgb={rgb}
    />
    <PushGridPad
      velocity={velocity}
      rgb = {rgb}
      pad={pad}
      padPressed={padPressed}
      padReleased={padReleased}
    />
  </div>
)

export default connect(
  ({ voices }, { voice }) => ({
    velocity: voices[voice] && voices[voice].velocity,
  }),
  (dispatch, { voice }) => ({
    padPressed (velocity) {
      dispatch(playSample(voice, velocity))
      dispatch(recordStep(voice, velocity))
      dispatch(selectVoice(voice))
    }
  })
)(SamplePlayerContainer)
