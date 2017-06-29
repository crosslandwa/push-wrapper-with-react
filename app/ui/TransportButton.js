'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomButton from '../push/DomButton'
import PushButton from '../push/PushButton'

import bindKeypress from '../utils/bindKeypress'

class TransportButton extends React.Component {
  constructor(props) {
    super(props)
    this.keypress = this.keypress.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.props.active ? this.props.turnOff() : this.props.turnOn()
  }

  render () {
    const {active, label, pushButton, rgb, turnOff, turnOn} = this.props
    return (
      <DomButton active={active}
        doubleHeight={true}
        label={label}
        padPressed={this.toggle}
        rgb={rgb}
      >
        <PushButton button={pushButton}
          dim={true}
          on={active}
          onPressed={this.toggle}
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

const mapStateToProps = (state, ownProps) => ({
  active: state.sequencer[ownProps.modifier]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  turnOn () {
    dispatch(ownProps.turnOn())
  },
  turnOff () {
    dispatch(ownProps.turnOff())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransportButton)
