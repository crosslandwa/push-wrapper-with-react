'use strict'
import React from 'react'
import TrackPlayerContainer from './TrackPlayerContainer'
import TrackRecorderContainer from './TrackRecorderContainer'
import RealtimeStepDeleteButton from '../sequencer/RealtimeStepDeleteButton'

const TrackControlComponent = (props) => {
  const {del, recording, trackId, pad} = props

  if (del) return <RealtimeStepDeleteButton trackId={trackId} pad={pad} />
  if (recording) return <TrackRecorderContainer trackId={trackId} pad={pad} />

  return <TrackPlayerContainer trackId={trackId} pad={pad} />
}

export default TrackControlComponent
