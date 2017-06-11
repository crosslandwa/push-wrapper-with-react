'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from './actions'
import TrackSelectContainer from './TrackSelectContainer'

const TrackPlayerContainer = (props) => <TrackSelectContainer {...props} />

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
