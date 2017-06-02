'use strict'
import React from 'react'
import BlankRow from './ui/BlankRow'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'
import StepControl from './sequencer/StepControl'
import StepDelete from './sequencer/StepDelete'
import StepJumping from './sequencer/StepJumping'
import RealtimeStepDeleteButton from './sequencer/RealtimeStepDeleteButton'
import ChromaticKeyboard from './voices/ChromaticKeyboard'
import SamplePlayerContainer from './voices/SamplePlayerContainer'
import SampleRecorderContainer from './voices/SampleRecorderContainer'
import TrackSelectContainer from './voices/TrackSelectContainer'
import { connect } from 'react-redux'

const App = ({ push, pushState, trackIds, recording, selectedStepId, selectedTrackId }) => {

  let StepControlComponent = StepControl
  let VoicePadComponent = recording ? SampleRecorderContainer : SamplePlayerContainer
  if (pushState.modifiers.shift) {
    StepControlComponent = StepJumping
    VoicePadComponent = TrackSelectContainer
  } else if (pushState.modifiers.del) {
    StepControlComponent = StepDelete
    VoicePadComponent = RealtimeStepDeleteButton
  }

  return (
    <div>
      <PushControlModifiers push={push} />
      <TransportControls push={push} />
      {trackIds.map((trackId, index) => (
        <VoicePadComponent
          key={index}
          trackId={trackId}
          pad={push.gridRow(7)[index]}
        />
      ))}
      <BlankRow />
      <ChromaticKeyboard
        basePitch={36}
        blackRow={push.gridRow(5)}
        recording={recording}
        whiteRow={push.gridRow(4)}
        trackId={selectedTrackId}
        selectedStepId={selectedStepId}
      />
      <StepControlComponent
        pads={[...push.gridRow(3), ...push.gridRow(2), ...push.gridRow(1), ...push.gridRow(0)]}
        trackId={selectedTrackId}
      />
    </div>
  )
}

export default connect(
  ({push, entities: {steps, tracks}, sequencer: {recording, selectedStepId}, ui: {selectedTrackId}}) => ({
    pushState: push,
    recording,
    selectedStepId,
    trackIds: tracks.allIds, // TODO this should be derived from selected pattern
    selectedTrackId
  })
)(App)
