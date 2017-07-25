'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { muteOff, muteOn } from './actions'
import { Colours } from '../push/colours'
import { voiceForTrack } from '../selectors'

const TrackMute = ({ muteOn, muteOff, pad, muted }) => (
  <DomGridPad
    padPressed={muted ? muteOff : muteOn}
    active={!!muted}
    rgb={muted ? Colours.red : Colours.off}
  >
    <PushGridPad
      rgb={muted ? Colours.red : Colours.off}
      pad={pad}
      padPressed={muted ? muteOff : muteOn}

    />
  </DomGridPad>
)

export default connect(
  ( state, { trackId }) => ({
    muted: voiceForTrack(state, trackId).muted
  }),
  (dispatch, { trackId }) => ({
    muteOn () {
      dispatch(muteOn(trackId))
    },
    muteOff () {
      dispatch(muteOff(trackId))
    }
  })
)(TrackMute)
