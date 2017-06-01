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
import { loadSample } from './voices/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      push, delModifier, shiftModifier, selectedVoice,
      voices, recording, selectedStepId
    } = this.props
    const voice = voices[selectedVoice]

    let StepControlComponent = StepControl
    let VoicePadComponent = recording ? SampleRecorderContainer : SamplePlayerContainer
    if (shiftModifier) {
      StepControlComponent = StepJumping
      VoicePadComponent = VoiceSelectContainer
    } else if (delModifier) {
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

  componentDidMount() {
    this.props.loadSample(0, 'kick.mp3', 'kick')
      .then(() => this.props.loadSample(1, 'snare.mp3', 'snare'))
      .then(() => this.props.loadSample(2, 'hat.mp3', 'hat'))
      .then(() => this.props.loadSample(3, 'bleep.mp3', 'bleep'))
  }
}

export default connect(
  ({push, entities: {steps}, sequencer: {recording, selectedStepId}, ui, voices}) => ({
    delModifier: push.modifiers.del,
    shiftModifier: push.modifiers.shift,
    selectedVoice: ui.selectedVoice,
    recording,
    selectedStepId,
    voices
  }),
  (dispatch) => ({
    loadSample (voice, url, name) {
      return dispatch(loadSample(voice, url, name))
    }
  })
)(App)
