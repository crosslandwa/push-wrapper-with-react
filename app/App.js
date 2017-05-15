'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'
import SequenceToggleRow from './SequenceToggleRow'
import SequencerDeleteButton from './SequencerDeleteButton'
import SequenceStepDisplay from './SequenceStepDisplay'
import SamplePlayerContainer from './SamplePlayerContainer'
import { connect } from 'react-redux'
import { loadSample } from './voices/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { push, delModifier } = this.props

    return (
      <div>
        <PushControlModifiers push={push} />
        <TransportControls push={push} />
        {[...Array(8).keys()].map(index => delModifier
          ? <SequencerDeleteButton key={index} voice={index} pad={push.gridRow(5)[index]} />
          : <SamplePlayerContainer key={index} voice={index} pad={push.gridRow(5)[index]} />
        )}
        <SequenceToggleRow pads={push.gridRow(4)} voice={0} />
        <SequenceToggleRow pads={push.gridRow(3)} voice={1} />
        <SequenceToggleRow pads={push.gridRow(2)} voice={2} />
        <SequenceStepDisplay pads={push.gridSelectButtons()} />
        <Rainbow row={() => push.gridRow(0)} />
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
  (state) => ({ delModifier: state.push.modifiers.del }),
  (dispatch) => ({
    loadSample (voice, url, name) {
      dispatch(loadSample(voice, url, name))
    }
  })
)(App)
