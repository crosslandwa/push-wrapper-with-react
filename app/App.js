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

const App = ({ push, pushState, selectedVoice, voices, recording, selectedStepId }) => {
  const voice = voices[selectedVoice]

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
      {[...Array(8).keys()].map(index => (
        <VoicePadComponent
          key={index}
          voice={index}
          pitch={voice.pitch}
          pad={push.gridRow(7)[index]}
        />
      ))}
      <BlankRow />
      <ChromaticKeyboard
        basePitch={36}
        blackRow={push.gridRow(5)}
        recording={recording}
        voice={selectedVoice}
        whiteRow={push.gridRow(4)}
        selectedStepId={selectedStepId}
      />
      <StepControlComponent
        pads={[...push.gridRow(3), ...push.gridRow(2), ...push.gridRow(1), ...push.gridRow(0)]}
        trackId={`track${selectedVoice}`} // TODO fix this hack
      />
    </div>
  )
}

export default connect(
  ({push, entities: {steps}, sequencer: {recording, selectedStepId}, ui, voices}) => ({
    pushState: push,
    selectedVoice: ui.selectedVoice,
    recording,
    selectedStepId,
    voices
  })
)(App)
