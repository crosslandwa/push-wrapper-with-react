'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { deleteModeOff, deleteModeOn } from './actions'
import { Colours } from '../push/colours'

const RealtimeStepDeleteButton = ({ padPressed, padReleased, pad, rgb }) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      padReleased={padReleased}
      active={true}
      className="pad"
      rgb={rgb}
    />
    <PushGridPad
      rgb = {rgb}
      pad={pad}
      padPressed={padPressed}
      padReleased={padReleased}
    />
  </div>
)

export default connect(
  ({ sequencer: { sequencesInDeleteMode } }, { voice }) => ({
    rgb: sequencesInDeleteMode.includes(voice) ? Colours.red.map(x => x + 30) : Colours.red.map(x => x - 30)
  }),
  (dispatch, { voice }) => ({
    padPressed () {
      dispatch(deleteModeOn(voice))
    },
    padReleased () {
      dispatch(deleteModeOff(voice))
    }
  })
)(RealtimeStepDeleteButton)
