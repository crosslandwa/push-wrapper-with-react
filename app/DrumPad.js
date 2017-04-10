'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.playing = this.playing.bind(this)
    this.stopped = this.stopped.bind(this)
    this.playWithVelocity = this.playWithVelocity.bind(this)
    this.state = {velocity: 0}
  }

  playWithVelocity(velocity) {
    this.state.player.play(midiGain(velocity))
  }

  playing(gain) {
    this.setState({velocity: (gain.velocity && gain.velocity()) || 100})
  }

  stopped() {
    this.setState({velocity: 0})
  }

  render() {
    return this.state.player ? (
      <div>
        <PushGridPad
          velocity={this.state.velocity}
          pad={this.props.pad}
          playWithVelocity={this.playWithVelocity}
          rgb={[250, 250, 0]}
        />
        <div>loaded {this.props.url}</div>
      </div>
    ) : (
      <div>loading {this.props.url}...</div>
    )
  }

  componentDidMount() {
    if (this.state.player) {
      this.state.player.on('started', this.playing)
      this.state.player.on('stopped', this.stopped)
    } else {
      this.props.factory.forResource(this.props.url).then(player => {
        player.toMaster()
        player.on('started', this.playing)
        player.on('stopped', this.stopped)
        this.props.push.grid.x[2].y[2].on('pressed', this.playWithVelocity) // hacked in temporarily
        this.setState({player})
      })
    }
  }

  componentWillUnmount() {
    if (this.state.player) {
      this.state.player.removeListener('started', this.playing)
      this.state.player.removeListener('stopped', this.stopped)
    }
    this.props.push.grid.x[2].y[2].removeListener('pressed', this.playWithVelocity) // hacked in temporarily
  }
}

export default DrumPad
