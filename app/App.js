'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import DomGridPad from './DomGridPad'
import ToggleRow from './ToggleRow'
import SamplePlayerContainer from './SamplePlayerContainer'
import { connect } from 'react-redux'
import { loadSample, startSequence } from './actions'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { push, loadSample, playing, startSequence } = this.props
    let rowOfPads = push.gridRow(1)
    return (
      <div>
        <DomGridPad
          padPressed={startSequence}
          active={playing}
          className="pad"
        />
        <SamplePlayerContainer sampleKey='kicko' />
        <SamplePlayerContainer sampleKey='snarey' />
        <ToggleRow gridRow={ () => push.gridRow(3) } sequenceKey='kicks' />
        <ToggleRow gridRow={ () => push.gridRow(2) } sequenceKey='snares' />
        <ToggleRow gridRow={ () => push.gridRow(1) } sequenceKey='step' />
        <Rainbow row={() => push.gridRow(0)} />
      </div>
    )
  }

  componentDidMount() {
    this.props.loadSample('kicko', 'kick.mp3')
    this.props.loadSample('snarey', 'snare.mp3')
  }
}

export default connect(
  ({ sequences: { playing } }) => ({ playing }), // mapStateToProps
  (dispatch) => ({
    loadSample (key, url) {
      dispatch(loadSample(key, url))
    },
    startSequence () {
      dispatch(startSequence())
    }
  })
)(App)
