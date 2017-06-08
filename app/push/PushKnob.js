'use strict'
import React from 'react'

class PushKnob extends React.Component {
  constructor(props) {
    super(props)
    this.pressed = this.pressed.bind(this)
    this.released = this.released.bind(this)
    this.turned = this.turned.bind(this)
  }

  pressed() {
    this.props.onPressed && this.props.onPressed()
  }

  released() {
    this.props.onReleased && this.props.onReleased()
  }

  turned (delta) {
    this.props.onTurned && this.props.onTurned(delta)
  }

  render() {
    return null
  }

  shouldComponentUpdate() {
    return true
  }

  componentDidMount() {
    const unsubscribePressedListener = this.props.knob.onPressed(this.pressed)
    const unsubscribeReleasedListener = this.props.knob.onReleased(this.released)
    const unsubscribeTurnedListener = this.props.knob.onTurned(this.turned)
    this.setState({unsubscribePressedListener, unsubscribeReleasedListener, unsubscribeTurnedListener})
  }

  componentWillUnmount() {
    this.state.unsubscribePressedListener()
    this.state.unsubscribeReleasedListener()
    this.state.unsubscribeTurnedListener()
  }
}

export default PushKnob
