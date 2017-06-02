'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { recordStep } from '../sequencer/actions'
import TrackPlayerContainer from './TrackPlayerContainer'

const TrackRecorderContainer = (props) => <TrackPlayerContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { trackId }) => ({
    padPressed (velocity) {
      dispatch(recordStep(trackId, { velocity }))
    }
  })
)(TrackRecorderContainer)
