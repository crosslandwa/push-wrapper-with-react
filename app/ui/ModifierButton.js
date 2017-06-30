'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomButton from '../push/DomButton'
import PushButton from '../push/PushButton'

import bindKeypress from '../utils/bindKeypress'

class ModifierButton extends React.Component {
  constructor(props) {
    super(props)
    this.keypress = this.keypress.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.props.active ? this.props.turnOff() : this.props.turnOn()
  }

  render () {
    const {active, label, pushButton, turnOff, turnOn} = this.props
    return (
      <DomButton active={active}
        label={label}
        padPressed={this.toggle}
      >
        <PushButton button={pushButton}
          dim={true}
          on={active}
          onPressed={turnOn}
          onReleased={turnOff}
        />
      </DomButton>
    )
  }

  keypress (event) {
    if (event.key === this.props.keypress) {
      event.preventDefault()
      this.toggle()
    }
  }

  componentDidMount() {
    if (this.props.keypress) {
      bindKeypress(this.keypress)
    }
  }
}

export default ModifierButton
