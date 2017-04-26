'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import DrumPad from './DrumPad'
import ToggleRow from './ToggleRow'

const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext()
const PlayerFactory = require('wac.sample-player')(context)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDrumPad = this.toggleDrumPad.bind(this)
    this.state = {drumPad: true}
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
        { this.state.drumPad && this.state.player &&
          <DrumPad
            player={this.state.player}
            url='kick.mp3'
            pad={rowOfPads[0]}
          />
        }
        { (this.state.player &&
          <DrumPad
            player={this.state.player}
            url='kick.mp3'
            pad={rowOfPads[1]}
          />
        ) || <div>loading kick.mp3...</div>
        }
        <Rainbow push={this.props.push} />
      </div>
    )
  }

  componentDidMount() {
    const unsubscribe = this.props.push.gridRow(1)[2].onPressed(this.toggleDrumPad)
    PlayerFactory.forResource('kick.mp3').then(player => {
      player.toMaster()
      this.setState({player, toggleDrumPadListener: unsubscribe})
    })
  }

  componentWillUnmount() {
    this.state.toggleDrumPadListener()
  }
}

export default App
