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
    this.props.velocity ? pad.ledRGB(...fade(...this.props.rgb, this.props.velocity)) : pad.ledOff()
    return null
  }

  componentDidMount() {
    const unsubscribePressedListener = this.props.pad.onPressed(this.padPressed)
    this.setState({unsubscribePressedListener})
  }

  componentWillUnmount() {
    this.state.unsubscribePressedListener()
    this.props.pad.ledOff()
  }
}

export default PushGridPad
