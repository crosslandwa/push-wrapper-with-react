'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import DrumPad from './DrumPad'
import ToggleRow from './ToggleRow'

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
    let rowOfPads = this.props.push.gridRow(1)
    return (
      <div>
        <ToggleRow gridRow={ () => this.props.push.gridRow(2) } />
        { this.state.drumPad &&
          <DrumPad sample='kick' pad={rowOfPads[0]} />
        }
        <DrumPad sample='snare' pad={rowOfPads[1]} />
        <Rainbow row={() => this.props.push.gridRow(0)} />
      </div>
    )
  }

  componentDidMount() {
    const unsubscribeToggleDrumPadListener = this.props.push.gridRow(1)[2].onPressed(this.toggleDrumPad)
    this.setState({unsubscribeToggleDrumPadListener})
  }

  componentWillUnmount() {
    this.state.unsubscribeToggleDrumPadListener()
  }
}

export default App
