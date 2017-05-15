'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { shiftOn, shiftOff } from './push/actions'
import DomGridPad from './DomGridPad'
import PushButton from './PushButton'

class PushControlModifiers extends React.Component {
  constructor(props) {
    super(props)
    this.shiftOn = this.shiftOn.bind(this)
    this.shiftOff = this.shiftOff.bind(this)
    this.toggleShift = this.toggleShift.bind(this)
  }

  toggleShift() {
    this.props.shift ? this.shiftOff() : this.shiftOn()
  }

  shiftOn () {
    this.props.shiftOn()
  }

  shiftOff () {
    this.props.shiftOff()
  }

  render () {
    const {shift, push} = this.props
    return (
      <div>
        <DomGridPad active={shift}
          rgb={[250, 160, 10]}
          padPressed={this.toggleShift}
        />
        <PushButton button={push.button('Shift')}
          dim={true}
          on={shift}
          onPressed={this.shiftOn}
          onReleased={this.shiftOff}
        />
      </div>
    )
  }
}

export default connect(
  ({ push: { modifiers: { shift } } }) => ({ shift }),
  (dispatch) => ({
    shiftOn () {
      dispatch(shiftOn())
    },
    shiftOff () {
      dispatch(shiftOff())
    }
  })
)(PushControlModifiers)
