'use strict'
import React from 'react'

const colour = max => Math.floor(Math.random() * (2 + 1))
const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })


class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.playing = this.playing.bind(this)
    this.stopped = this.stopped.bind(this)

    this.state = {velocity: 0}
    props.player.toMaster()
    props.pad.on('pressed', velocity => props.player.play(midiGain(velocity)))
    props.player.on('started', this.playing)
    props.player.on('stopped', this.stopped)
  }

  playing(gain) {
    this.setState({velocity: gain.velocity()})
  }

  stopped() {
    this.setState({velocity: 0})
  }

  render() {
    let pad = this.props.pad
    this.state.velocity ? pad.led_on(this.state.velocity) : pad.led_off()
    return null
  }

  componentWillUnmount() {
    this.props.pad.led_off()
  }
}

export default DrumPad
