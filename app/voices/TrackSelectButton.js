'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { selectTrack } from '../ui/actions'
import { Colours } from '../push/colours'

const TrackSelectButton = ({ button, onPressed, trackId, selected }) => (
  <div style={{display: 'inline-block'}} >
    <DomGridButton
      onPressed={onPressed}
      active={selected}
      rgb={Colours.orange}
    />
    <PushGridSelectButton
      button={button}
      onPressed={onPressed}
      rgb={selected ? Colours.orange : Colours.off}
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
