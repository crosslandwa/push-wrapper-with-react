'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { recordStep } from '../sequencer/actions'
import TrackPlayerPad from './TrackPlayerPad'

const TrackRecorderContainer = (props) => <TrackPlayerPad {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId }) => ({
    padPressed (velocity) {
      dispatch(recordStep(trackId, { velocity }))
    }
  })
)(TrackRecorderContainer)
