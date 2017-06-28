'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { realtimeStepRecord } from '../sequencer/actions'
import TrackPlayerPad from './TrackPlayerPad'

const TrackRecorderContainer = (props) => <TrackPlayerPad {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId }) => ({
    padPressed (velocity) {
      dispatch(realtimeStepRecord(trackId, { velocity }))
    }
  })
)(TrackRecorderContainer)
