'use strict'
import React from 'react'
import DrumPad from './DrumPad'
import Rainbow from './Rainbow'
import PushButton from './PushButton'

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
          <DrumPad pad={grid.x[1].y[2]} player={this.props.player} />
          : <PushButton active="true" pushButton={grid.x[1].y[2]} />
        }
        <Rainbow push={this.props.push} />
      </div>
    )
  }

  componentDidMount() {
    let grid = this.props.push.grid
    grid.x[2].y[2].on('pressed', this.props.player.play)
    grid.x[3].y[2].on('pressed', this.toggleDrumPad)
  }

  componentWillUnmount() {
    let grid = this.props.push.grid
    grid.x[2].y[2].removeListener('pressed', this.props.player.play)
    grid.x[3].y[2].removeListener('pressed', this.toggleDrumPad)
  }
}

export default App
