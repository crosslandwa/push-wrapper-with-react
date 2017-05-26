'use strict'
import React from 'react'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'
import SequenceToggleRow from './SequenceToggleRow'
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

    return (
      <div>
        <PushControlModifiers push={push} />
        <TransportControls push={push} />
        <SequenceStepDisplay pads={push.gridSelectButtons()} />
        {[...Array(8).keys()].map(index => {
          let Component = SamplePlayerContainer
          switch (true) {
            case (shiftModifier):
              Component = VoiceSelectContainer; break;
            case (delModifier):
              Component = SequencerDeleteButton; break;
          }
            return <Component key={index} voice={index} pad={push.gridRow(7)[index]} />
        })}
        <SequenceToggleRow pads={push.gridRow(6)} voice={selectedVoice} />
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
