'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { unmuteTrack, muteTrack } from './actions'
import { Colours } from '../push/colours'
import { trackSelector } from '../selectors'

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
    muted: trackSelector(state, trackId).muted
  }),
  (dispatch, { trackId }) => ({
    muteOn () {
      dispatch(muteTrack(trackId))
    },
    muteOff () {
      dispatch(unmuteTrack(trackId))
    }
  })
)(TrackMute)
