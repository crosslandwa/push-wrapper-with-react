'use strict'
import React from 'react'

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.playing = this.playing.bind(this)
    this.stopped = this.stopped.bind(this)
    this.padPressed = this.padPressed.bind(this)

    this.state = {velocity: 0}
  }

  padPressed(velocity) {
    this.props.player.play(midiGain(velocity))
  }

  playing(gain) {
    this.setState({velocity: (gain.velocity && gain.velocity()) || 100})
  }

  stopped() {
    this.setState({velocity: 0})
  }

  render() {
    let pad = this.props.pad
    this.state.velocity ? pad.led_on(this.state.velocity) : pad.led_off()
    return null
  }

  componentDidMount() {
    this.props.pad.on('pressed', this.padPressed)
    this.props.player.on('started', this.playing)
    this.props.player.on('stopped', this.stopped)
  }

  componentWillUnmount() {
    this.props.pad.removeListener('pressed', this.padPressed)
    this.props.player.removeListener('started', this.playing)
    this.props.player.removeListener('stopped', this.stopped)
    this.props.pad.led_off()
  }
}

export default DrumPad
