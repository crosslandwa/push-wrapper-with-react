'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { selectVoice } from '../ui/actions'
import { Colours } from '../push/colours'

const playingColour = velocity => velocity > 0 ? Colours.turquoise : false
const selectedColour = selected => selected ? Colours.orange : false

const VoiceSelectContainer = ({ velocity = 0, padPressed, padReleased, pad, selected}) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      active={(velocity > 0) || selected}
      rgb={playingColour(velocity) || selectedColour(selected)}
    />
    <PushGridPad
      rgb={playingColour(velocity) || selectedColour(selected) || Colours.off}
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
