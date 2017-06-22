'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { deleteModeOff, deleteModeOn } from './actions'
import { Colours } from '../push/colours'

const RealtimeStepDeleteButton = ({ padPressed, padReleased, pad, rgb }) => (
  <PushGridPad
    rgb = {rgb}
    pad={pad}
    padPressed={padPressed}
    padReleased={padReleased}
  >
    <DomGridPad
      padPressed={padPressed}
      padReleased={padReleased}
      active={true}
      className="pad"
      rgb={rgb}
    />
  </PushGridPad>
)

export default connect(
  ({ sequencer: { deleteModeTrackIds } }, { trackId }) => ({
    rgb: deleteModeTrackIds.includes(trackId) ? Colours.red.map(x => x + 30) : Colours.red.map(x => x - 30)
  }),
  (dispatch, { trackId }) => ({
    padPressed () {
      dispatch(deleteModeOn(trackId))
    },
    padReleased () {
      dispatch(deleteModeOff(trackId))
    }
  })
)(RealtimeStepDeleteButton)
