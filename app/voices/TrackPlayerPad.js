'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from './actions'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'
import { voiceForTrack } from '../selectors'

const TrackPlayerPad = ({ active, padPressed, padReleased, pad}) => (
  <DomGridPad
    padPressed={padPressed}
    active={active}
    rgb={Colours.turquoise}
  >
    <PushGridPad
      rgb={active ? Colours.turquoise : Colours.off}
      pad={pad}
      padPressed={padPressed}
    />
  </DomGridPad>
)

const mapStateToProps = (state, { trackId }) => ({
  active: voiceForTrack(state, trackId).velocity > 0,
})

const mapDispatchToProps = (dispatch, { trackId, padPressed }) => ({
  padPressed (velocity) {
    dispatch(playVoiceForTrack(trackId, {velocity}))
    padPressed && padPressed(velocity)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackPlayerPad)
