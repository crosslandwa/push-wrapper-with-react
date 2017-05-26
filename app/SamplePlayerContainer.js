'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from './DomGridPad'
import PushGridPad from './PushGridPad'
import { playSample } from './voices/actions'
import { recordStep } from './sequencer/actions'
import { selectVoice } from './ui/actions'
import Colours from './push/colours'

const padColour = velocity => velocity > 0 ? Colours.blue : Colours.orange

const SamplePlayerContainer = ({ velocity = 0, padPressed, padReleased, pad, selected }) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      padReleased={padReleased}
      active={(velocity > 0) || selected}
      rgb={padColour(velocity)}
    />
    <PushGridPad
      velocity={(velocity > 0) ? velocity : (selected ? 100 : 0)}
      rgb={padColour(velocity)}
      pad={pad}
      padPressed={padPressed}
      padReleased={padReleased}
    />
  </div>
)

export default connect(
  ({ voices, ui }, { voice }) => ({
    selected: ui.selectedVoice === voice,
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
