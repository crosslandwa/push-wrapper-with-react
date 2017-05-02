'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import DrumPad from './DrumPad'
import ToggleRow from './ToggleRow'
import SamplePlayerContainer from './SamplePlayerContainer'
import { connect } from 'react-redux'
import { loadSample } from './actions'

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
    const { push, loadSample } = this.props
    let rowOfPads = push.gridRow(1)
    return (
      <div>
        <SamplePlayerContainer sampleKey='kicko' />
        <SamplePlayerContainer sampleKey='snarey' />
        <ToggleRow gridRow={ () => push.gridRow(2) } />
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
  () => ({ }), // mapStateToProps
  (dispatch) => ({
    loadSample (key, url) {
      dispatch(loadSample(key, url))
    }
  })
)(App)
