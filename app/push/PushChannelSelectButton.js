'use strict'
import React from 'react'
import { Colours } from './colours'

class PushChannelSelectButton extends React.Component {
  constructor(props) {
    super(props)
    this.pressed = this.pressed.bind(this)
    this.released = this.released.bind(this)
  }

  pressed() {
    this.props.onPressed()
  }

  released() {
    this.props.onReleased && this.props.onReleased()
  }

  render() {
    const {button, rgb} = this.props
    switch (rgb) {
      case Colours.off:
        button.ledOff()
        break
      case Colours.green:
        button.ledOn('green')
        break
      case Colours.red:
        button.ledOn('red')
        break
      case Colours.yellow:
        button.ledOn('yellow')
        break
      case Colours.orange:
      default:
        button.ledOn('orange')
        break
    }
    return null
  }

  shouldComponentUpdate(nextProps) {
    const [r1, g1, b1] = this.props.rgb || []
    const [r2, g2, b2] = nextProps.rgb || []
    return (r1 !== r2) || (g1 !== g2) || (b1 !== b2)
  }

  componentDidMount() {
    const unsubscribePressedListener = this.props.button.onPressed(this.pressed)
    const unsubscribeReleasedListener = this.props.button.onReleased(this.released)
    this.setState({unsubscribePressedListener, unsubscribeReleasedListener})
  }

  componentWillUnmount() {
    this.state.unsubscribePressedListener()
    this.state.unsubscribeReleasedListener()
  }
}

export default PushChannelSelectButton
