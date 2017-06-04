'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from './actions'
import TrackSelectContainer from './TrackSelectContainer'

const TrackPlayerContainer = (props) => <TrackSelectContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId, padPressed }) => ({
    padPressed (velocity) {
      dispatch(playVoiceForTrack(trackId, {velocity}))
      padPressed && padPressed(velocity)
    }
  })
)(TrackPlayerContainer)
