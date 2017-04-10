'use strict'
import React from 'react'
import DrumPad from './DrumPad'

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })
const fade = (r, g, b, velocity) => [r, g, b].map(x => Math.round(x / 127 * velocity))


class PushGridPad extends React.Component {
  constructor(props) {
    super(props)
    this.padPressed = this.padPressed.bind(this)
  }

  padPressed(velocity) {
    this.props.playWithVelocity(velocity)
  }

  render() {
    let pad = this.props.pad
    this.props.velocity ? pad.led_rgb(...fade(...this.props.rgb, this.props.velocity)) : pad.led_off()
    return null
  }

  componentDidMount() {
    this.props.pad.on('pressed', this.padPressed)
  }

  componentWillUnmount() {
    this.props.pad.removeListener('pressed', this.padPressed)
    this.props.pad.led_off()
  }
}

export default PushGridPad
