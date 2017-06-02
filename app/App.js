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
import VoiceSelectContainer from './voices/VoiceSelectContainer'
import { connect } from 'react-redux'

const App = ({ push, pushState, voiceIds, trackIds, selectedVoiceId, recording, selectedStepId, selectedTrackId }) => {

  let StepControlComponent = StepControl
  let VoicePadComponent = recording ? SampleRecorderContainer : SamplePlayerContainer
  if (pushState.modifiers.shift) {
    StepControlComponent = StepJumping
    VoicePadComponent = VoiceSelectContainer
  } else if (pushState.modifiers.del) {
    StepControlComponent = StepDelete
    VoicePadComponent = RealtimeStepDeleteButton
  }

  return (
    <div>
      <PushControlModifiers push={push} />
      <TransportControls push={push} />
      {voiceIds.map((voiceId, index) => (
        <VoicePadComponent
          key={voiceId}
          voiceId={voiceId}
          trackId={trackIds[index]} // TODO fix track <-> voice mappings
          pad={push.gridRow(7)[index]}
        />
      ))}
      <BlankRow />
      <ChromaticKeyboard
        basePitch={36}
        blackRow={push.gridRow(5)}
        recording={recording}
        voiceId={selectedVoiceId}
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
  ({push, entities: {steps, tracks, voices}, sequencer: {recording, selectedStepId}, ui: {selectedVoiceId}}) => ({
    pushState: push,
    selectedVoiceId,
    recording,
    selectedStepId,
    voiceIds: voices.allIds,
    trackIds: tracks.allIds,
    selectedTrackId: tracks.allIds[voices.allIds.indexOf(selectedVoiceId)] // TODO this isn't quite right
  })
)(App)
