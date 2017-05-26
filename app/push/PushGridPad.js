'use strict'
import React from 'react'

const fade = (r, g, b, velocity) => [r, g, b].map(x => Math.round(x / 127 * velocity))

class PushGridPad extends React.Component {
  constructor(props) {
    super(props)
    this.padPressed = this.padPressed.bind(this)
    this.padReleased = this.padReleased.bind(this)
  }

  padPressed(velocity) {
    this.props.padPressed(velocity)
  }

  padReleased() {
    this.props.padReleased && this.props.padReleased()
  }

  render() {
    const {pad, velocity, rgb} = this.props
    const turnOn = rgb ? velocity => pad.ledRGB(...fade(...rgb, velocity)) : pad.ledOn
    velocity ? turnOn(velocity) : pad.ledOff()
    return null
  }

  componentDidMount() {
    const unsubscribePressedListener = this.props.pad.onPressed(this.padPressed)
    const unsubscribeReleasedListener = this.props.pad.onReleased(this.padReleased)
    this.setState({unsubscribePressedListener, unsubscribeReleasedListener})
  }

  componentWillUnmount() {
    this.state.unsubscribePressedListener()
    this.state.unsubscribeReleasedListener()
    this.props.pad.ledOff()
  }
}

export default PushGridPad
