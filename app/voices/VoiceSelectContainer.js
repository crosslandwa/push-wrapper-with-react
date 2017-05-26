'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../DomGridPad'
import PushGridPad from '../PushGridPad'
import { selectVoice } from '../ui/actions'
import Colours from '../push/colours'

const VoiceSelectContainer = ({ velocity = 0, padPressed, padReleased, pad, rgb = Colours.blue}) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      active={velocity > 0}
      rgb={rgb}
    />
    <PushGridPad
      velocity={velocity}
      rgb = {rgb}
      pad={pad}
      padPressed={padPressed}
    />
  </div>
)

export default connect(
  ({ voices }, { voice }) => ({
    velocity: voices[voice] && voices[voice].velocity,
  }),
  (dispatch, { voice }) => ({
    padPressed (velocity) {
      dispatch(selectVoice(voice))
    }
  })
)(VoiceSelectContainer)
