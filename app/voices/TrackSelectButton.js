'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { selectTrack } from '../ui/actions'
import { Colours } from '../push/colours'
import { currentTrack } from '../selectors'

const TrackSelectButton = ({ button, onPressed, trackId, selected }) => (
  <DomGridButton
    onPressed={onPressed}
    active={selected}
    rgb={Colours.orange}
  >
    <PushGridSelectButton
      button={button}
      onPressed={onPressed}
      rgb={selected ? Colours.orange : Colours.off}
    />
  </DomGridButton>
)

const mapStateToProps = (state, { trackId }) => ({
  selected: currentTrack(state).id === trackId,
})

const mapDispatchToProps = (dispatch, { trackId }) => ({
  onPressed () {
    dispatch(selectTrack(trackId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackSelectButton)
