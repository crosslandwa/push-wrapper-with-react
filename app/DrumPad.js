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
    this.props.player.play(midiGain(velocity))
  }

  playing(gain) {
    this.setState({velocity: (gain.velocity && gain.velocity()) || 100})
  }

  stopped() {
    this.setState({velocity: 0})
  }

  render() {
    return (
      <div>
        <PushGridPad
          velocity={this.state.velocity}
          pad={this.props.pad}
          playWithVelocity={this.playWithVelocity}
          rgb={[250, 250, 0]}
        />
        <div>Playing {this.props.url}</div>
      </div>
    )
  }

  componentDidMount() {
    this.props.player.on('started', this.playing)
    this.props.player.on('stopped', this.stopped)
  }

  componentWillUnmount() {
    this.props.player.removeListener('started', this.playing)
    this.props.player.removeListener('stopped', this.stopped)
  }
}

export default DrumPad
