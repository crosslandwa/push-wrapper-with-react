'use strict'
import React from 'react'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'
import StepControl from './sequencer/StepControl'
import StepJumping from './sequencer/StepJumping'
import SequencerDeleteButton from './SequencerDeleteButton'
import SequenceStepDisplay from './SequenceStepDisplay'
import SamplePlayerContainer from './voices/SamplePlayerContainer'
import VoiceSelectContainer from './voices/VoiceSelectContainer'
import { connect } from 'react-redux'
import { loadSample } from './voices/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { push, delModifier, shiftModifier, selectedVoice } = this.props

    const StepControlComponent = shiftModifier ? StepJumping : StepControl
    let VoicePadComponent = SamplePlayerContainer
    if (shiftModifier) {
      VoicePadComponent = VoiceSelectContainer
    } else if (delModifier) {
      VoicePadComponent = SequencerDeleteButton
    }

    return (
      <div>
        <PushControlModifiers push={push} />
        <TransportControls push={push} />
        <SequenceStepDisplay pads={push.gridSelectButtons()} />
        {[...Array(8).keys()].map(index => <VoicePadComponent key={index} voice={index} pad={push.gridRow(7)[index]} />)}
        <StepControlComponent pads={[...push.gridRow(1), ...push.gridRow(0)]} voice={selectedVoice} />
      </div>
    )
  }

  componentDidMount() {
    this.props.loadSample(0, 'kick.mp3', 'kick')
    this.props.loadSample(1, 'snare.mp3', 'snare')
    this.props.loadSample(2, 'hat.mp3', 'hat')
  }
}

export default connect(
  (state) => ({
    delModifier: state.push.modifiers.del,
    shiftModifier: state.push.modifiers.shift,
    selectedVoice: state.ui.selectedVoice
  }),
  (dispatch) => ({
    loadSample (voice, url, name) {
      dispatch(loadSample(voice, url, name))
    }
  })
)(App)
