'use strict'
import React from 'react'
import Rainbow from './Rainbow'
import PushButton from './PushButton'
import DrumPad from './DrumPad'

const context = new window.AudioContext()
const PlayerFactory = require('wac.sample-player')(context)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDrumPad = this.toggleDrumPad.bind(this)
    this.state = {drumPad: false}
  }

  toggleDrumPad () {
    this.setState(prevState => ({
      drumPad: !prevState.drumPad
    }))
  }

  render() {
    let grid = this.props.push.grid
    return (
      <div>
        { this.state.drumPad ?
          <DrumPad
            factory={PlayerFactory}
            url='kick.mp3'
            pad={grid.x[1].y[2]}
            push={this.props.push}
          />
          : <PushButton active="true" pushButton={grid.x[1].y[2]} />
        }
        <Rainbow push={this.props.push} />
      </div>
    )
  }

  componentDidMount() {
    let grid = this.props.push.grid
    grid.x[3].y[2].on('pressed', this.toggleDrumPad)
  }

  componentWillUnmount() {
    let grid = this.props.push.grid
    grid.x[3].y[2].removeListener('pressed', this.toggleDrumPad)
  }
}

export default App
