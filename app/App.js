'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import DomGridPad from './DomGridPad'
import DrumPad from './DrumPad'
import ToggleRow from './ToggleRow'
import SamplePlayerContainer from './SamplePlayerContainer'
import { connect } from 'react-redux'
import { loadSample, startSequence } from './actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDrumPad = this.toggleDrumPad.bind(this)

    this.state = {
      drumPad: true,
    }
  }

  toggleDrumPad () {
    this.setState(prevState => ({
      drumPad: !prevState.drumPad
    }))
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
        <ToggleRow gridRow={ () => push.gridRow(2) } sequenceKey='step' />
        { this.state.drumPad &&
          <DrumPad sample='kick' pad={rowOfPads[0]} />
        }
        <DrumPad sample='snare' pad={rowOfPads[1]} />
        <Rainbow row={() => push.gridRow(0)} />
      </div>
    )
  }

  componentDidMount() {
    this.props.loadSample('kicko', 'kick.mp3')
    this.props.loadSample('snarey', 'snare.mp3')
    const unsubscribeToggleDrumPadListener = this.props.push.gridRow(1)[2].onPressed(this.toggleDrumPad)
    this.setState({unsubscribeToggleDrumPadListener})
  }

  componentWillUnmount() {
    this.state.unsubscribeToggleDrumPadListener()
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
