'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { updateVolumeAction, updateVolume } from './actions'
import { voiceForTrack } from '../selectors'

const VolumeControl = props => {
  props.updateVolume(props.midiVolume)
  return (
    <ClickyDraggy {...props}>
      <DomKnob />
      <PushKnob {...props} />
    </ClickyDraggy>
  )
}

const mapStateToProps = (state, ownProps) => ({
  midiVolume: voiceForTrack(state, ownProps.trackId).midiVolume
})

const mapDispatchToProps = (dispatch, { trackId }) => {
  return {
    onTurned(delta) {
      dispatch(updateVolumeAction(trackId, delta))
    },
    updateVolume(volume) {
      dispatch(updateVolume(trackId, volume))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControl)