'use strict'
import React from 'react'
import SamplePlayerContainer from './SamplePlayerContainer'
import SampleRecorderContainer from './SampleRecorderContainer'
import TrackSelectContainer from './TrackSelectContainer'
import RealtimeStepDeleteButton from '../sequencer/RealtimeStepDeleteButton'

const TrackControlComponent = (props) => {
  const {shift, del, recording, trackId, pad} = props

  if (shift) return <TrackSelectContainer trackId={trackId} pad={pad} />
  if (del) return <RealtimeStepDeleteButton trackId={trackId} pad={pad} />
  if (recording) return <SampleRecorderContainer trackId={trackId} pad={pad} />

  return <SamplePlayerContainer trackId={trackId} pad={pad} />
}

export default TrackControlComponent
