'use strict'
import React from 'react'

class PushButton extends React.Component {
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
    const {button, on, dim} = this.props
    on ? button.ledOn() : (dim ? button.ledDim() : button.ledOff())
    return null
  }

  shouldComponentUpdate(nextProps) {
    // assumes button and dim are fixed for duration of Components lifecycle
    return this.props.on !== nextProps.on
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

export default PushButton
