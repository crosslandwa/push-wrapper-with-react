'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import SequenceStartStop from './SequenceStartStop'
import SequenceToggleRow from './SequenceToggleRow'
import SequenceStepDisplay from './SequenceStepDisplay'
import SamplePlayerContainer from './SamplePlayerContainer'
import { connect } from 'react-redux'
import { loadSample, startSequence, stopSequence } from './actions'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { push } = this.props
    return (
      <div>
        <SequenceStartStop button={push.button('Play')} />
        <SamplePlayerContainer sampleKey='kick' />
        <SamplePlayerContainer sampleKey='snare' />
        <SamplePlayerContainer sampleKey='hat' />
        <SequenceToggleRow gridRow={ () => push.gridRow(4) } sequenceKey='kick' />
        <SequenceToggleRow gridRow={ () => push.gridRow(3) } sequenceKey='snare' />
        <SequenceToggleRow gridRow={ () => push.gridRow(2) } sequenceKey='hat' />
        <SequenceStepDisplay gridRow={ () => push.gridRow(1) } />
        <Rainbow row={() => push.gridRow(0)} />
      </div>
    )
  }

  componentDidMount() {
    this.props.loadSample('kick', 'kick.mp3')
    this.props.loadSample('snare', 'snare.mp3')
    this.props.loadSample('hat', 'hat.mp3')
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    loadSample (key, url) {
      dispatch(loadSample(key, url))
    }
  })
)(App)
