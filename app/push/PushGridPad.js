'use strict'
import React from 'react'
import { Colours } from './colours'

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
    const {pad, rgb, velocity} = this.props
    if (rgb) {
      (rgb === Colours.off) ? pad.ledOff() : pad.ledRGB(...rgb)
    } else {
      pad.ledOn(velocity)
    }
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
