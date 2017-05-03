'use strict'
import React from 'react'

class PushButton extends React.Component {
  constructor(props) {
    super(props)
    this.pressed = this.pressed.bind(this)
  }

  pressed() {
    this.props.pressed()
  }

  render() {
    const {button, on, dim} = this.props
    on ? button.ledOn() : (dim ? button.ledDim() : button.ledOff())
    return null
  }

  componentDidMount() {
    const unsubscribePressedListener = this.props.button.onPressed(this.pressed)
    this.setState({unsubscribePressedListener})
  }

  componentWillUnmount() {
    this.state.unsubscribePressedListener()
  }
}

export default PushButton
