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

  shouldComponentUpdate(nextProps) {
    // assumes pad is fixed for duration of Components lifecycle
    if (this.props.rgb) {
      const [r1, g1, b1] = this.props.rgb
      const [r2, g2, b2] = nextProps.rgb || []
      return (r1 !== r2) || (g1 !== g2) || (b1 !== b2)
    }
    return this.props.velocity !== nextProps.velocity
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
