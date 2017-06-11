'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridButton from '../push/DomGridButton'
// import PushGridPad from '../push/PushGridPad'
import { selectTrack } from '../ui/actions'
import { Colours } from '../push/colours'

const TrackSelectButton = ({ onPressed, trackId, selected }) => (
  <div style={{display: 'inline-block'}} >
    <DomGridButton
      onPressed={onPressed}
      active={selected}
      rgb={Colours.orange}
    />
  </div>
)

const mapStateToProps = ({ ui: { selectedTrackId } }, { trackId }) => ({
  selected: selectedTrackId === trackId,
})

const mapDispatchToProps = (dispatch, { trackId }) => ({
  onPressed () {
    dispatch(selectTrack(trackId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackSelectButton)
