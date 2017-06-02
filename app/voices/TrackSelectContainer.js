'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { selectTrack } from '../ui/actions'
import { Colours } from '../push/colours'

const playingColour = velocity => velocity > 0 ? Colours.turquoise : false
const selectedColour = selected => selected ? Colours.orange : false

const TrackSelectContainer = ({ velocity = 0, padPressed, padReleased, pad, selected}) => (
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
  ({ entities: { voices, tracks }, ui: { selectedTrackId } }, { trackId }) => {
    const voiceId = tracks.byId[trackId].voiceId
    return {
      selected: selectedTrackId === trackId,
      velocity: voices.byId[voiceId].velocity,
    }
  },
  (dispatch, { trackId, padPressed }) => ({
    padPressed (velocity) {
      dispatch(selectTrack(trackId))
      padPressed && padPressed(velocity)
    }
  })
)(TrackSelectContainer)
