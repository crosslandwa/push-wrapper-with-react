'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomButton from '../push/DomButton'
import PushButton from '../push/PushButton'

import bindKeypress from '../utils/bindKeypress'

const recIconStyle = {
  alignSelf: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: 24,
  width: 24,
  borderRadius: 50,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'rgba(100, 100, 100, 1)',
  boxShadow: 'inset 0px 0px 8px rgba(200, 200, 200, 1)',
  cursor: 'pointer'
}

const playIconStyle = {}

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
    const isRec = label === 'Rec'
    return (
      <DomButton active={active}
        doubleHeight={true}
        label={!isRec && label}
        padPressed={this.toggle}
        rgb={rgb}
      >
        <PushButton button={pushButton}
          dim={true}
          on={active}
          onPressed={this.toggle}
        />
        <div style={isRec ? recIconStyle : playIconStyle}/>
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
