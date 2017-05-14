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
        {[...Array(8).keys()].map(index => (
          <SamplePlayerContainer key={index} voice={index} />
        ))}
        <SequenceToggleRow gridRow={ () => push.gridRow(4) } sequenceKey='kick' />
        <SequenceToggleRow gridRow={ () => push.gridRow(3) } sequenceKey='snare' />
        <SequenceToggleRow gridRow={ () => push.gridRow(2) } sequenceKey='hat' />
        <SequenceStepDisplay gridRow={ () => push.gridRow(1) } />
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
  (state) => ({}),
  (dispatch) => ({
    loadSample (voice, url, name) {
      dispatch(loadSample(voice, url, name))
    }
  })
)(App)
