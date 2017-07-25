'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { muteOff, muteOn } from './actions'
import { Colours } from '../push/colours'

const RealtimeStepDeleteButton = ({ padPressed, padReleased, pad, rgb }) => (
  <DomGridPad
    padPressed={padPressed}
    padReleased={padReleased}
    active={true}
    rgb={rgb}
  >
    <PushGridPad
      rgb = {rgb}
      pad={pad}
      padPressed={padPressed}
      padReleased={padReleased}
    />
  </DomGridPad>
)

export default connect(
  ({ sequencer: { deleteModeTrackIds } }, { trackId }) => ({
    rgb: deleteModeTrackIds.includes(trackId) ? Colours.red.map(x => x + 30) : Colours.red.map(x => x - 30)
  }),
  (dispatch, { trackId }) => ({
    padPressed () {
      dispatch(muteOn(trackId))
    },
    padReleased () {
      dispatch(muteOff(trackId))
    }
  })
)(RealtimeStepDeleteButton)
