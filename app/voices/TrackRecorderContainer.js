'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from './actions'
import { realtimeStepRecord } from '../sequencer/actions'
import TrackPlayingPad from './TrackPlayingPad'

const TrackRecorderContainer = (props) => <TrackPlayingPad {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId }) => ({
    padPressed (velocity) {
      dispatch(playVoiceForTrack(trackId, {velocity}))
      dispatch(realtimeStepRecord(trackId, { velocity }))
    }
  })
)(TrackRecorderContainer)
