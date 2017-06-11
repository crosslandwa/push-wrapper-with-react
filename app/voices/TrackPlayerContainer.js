'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from './actions'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'

const TrackPlayerContainer = ({ velocity = 0, padPressed, padReleased, pad}) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      active={(velocity > 0)}
      rgb={Colours.turquoise}
    />
    <PushGridPad
      rgb={velocity > 0 ? Colours.turquoise : Colours.off}
      pad={pad}
      padPressed={padPressed}
    />
  </div>
)

const mapStateToProps = ({ entities: { voices, tracks } }, { trackId }) => {
  const voiceId = tracks.byId[trackId].voiceId
  return {
    velocity: voices.byId[voiceId].velocity,
  }
}

const mapDispatchToProps = (dispatch, { trackId, padPressed }) => ({
  padPressed (velocity) {
    dispatch(playVoiceForTrack(trackId, {velocity}))
    padPressed && padPressed(velocity)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackPlayerContainer)
