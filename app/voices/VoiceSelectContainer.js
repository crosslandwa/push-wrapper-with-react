'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { selectVoice } from '../ui/actions'
import Colours from '../push/colours'

const padColour = velocity => velocity > 0 ? Colours.turquoise : Colours.orange

const VoiceSelectContainer = ({ velocity = 0, padPressed, padReleased, pad, selected}) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      active={(velocity > 0) || selected}
      rgb={padColour(velocity)}
    />
    <PushGridPad
      velocity={(velocity > 0) ? velocity : (selected ? 100 : 0)}
      rgb={padColour(velocity)}
      pad={pad}
      padPressed={padPressed}
    />
  </div>
)

export default connect(
  ({ voices, ui }, { voice }) => ({
    selected: ui.selectedVoice === voice,
    velocity: voices[voice] && voices[voice].velocity,
  }),
  (dispatch, { voice, padPressed }) => ({
    padPressed (velocity) {
      dispatch(selectVoice(voice))
      padPressed && padPressed(velocity)
    }
  })
)(VoiceSelectContainer)
