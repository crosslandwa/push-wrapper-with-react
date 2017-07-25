'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playVoiceForTrack } from '../player/actions'
import TrackPlayingPad from './TrackPlayingPad'

const TrackPlayerContainer = (props) => <TrackPlayingPad {...props} />

const mapStateToProps = (state, { trackId }) => ({})

const mapDispatchToProps = (dispatch, { trackId }) => ({
  padPressed (velocity) {
    dispatch(playVoiceForTrack(trackId, {velocity}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackPlayerContainer)
