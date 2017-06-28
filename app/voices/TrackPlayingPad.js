'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'
import { voiceForTrack } from '../selectors'

const TrackPlayingPad = ({ active, padPressed, padReleased, pad}) => (
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

export default connect(mapStateToProps)(TrackPlayingPad)
