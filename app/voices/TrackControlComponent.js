'use strict'
import React from 'react'
import TrackPlayerContainer from './TrackPlayerContainer'
import TrackRecorderContainer from './TrackRecorderContainer'
import TrackSelectContainer from './TrackSelectContainer'
import RealtimeStepDeleteButton from '../sequencer/RealtimeStepDeleteButton'

const TrackControlComponent = (props) => {
  const {shift, del, recording, trackId, pad} = props

  if (shift) return <TrackSelectContainer trackId={trackId} pad={pad} />
  if (del) return <RealtimeStepDeleteButton trackId={trackId} pad={pad} />
  if (recording) return <TrackRecorderContainer trackId={trackId} pad={pad} />

  return <TrackPlayerContainer trackId={trackId} pad={pad} />
}

export default TrackControlComponent
