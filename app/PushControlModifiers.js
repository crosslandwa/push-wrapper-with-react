'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { deleteOff, deleteOn, shiftOff, shiftOn } from './push/actions'
import DomGridPad from './DomGridPad'
import PushButton from './PushButton'

class PushControlModifiers extends React.Component {
  constructor(props) {
    super(props)
    this.deleteOn = this.deleteOn.bind(this)
    this.deleteOff = this.deleteOff.bind(this)
    this.shiftOn = this.shiftOn.bind(this)
    this.shiftOff = this.shiftOff.bind(this)
    this.toggleShift = this.toggleShift.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
  }

  toggleDelete() {
    this.props.del ? this.deleteOff() : this.deleteOn()
  }

  toggleShift() {
    this.props.shift ? this.shiftOff() : this.shiftOn()
  }

  deleteOn () {
    this.props.deleteOn()
  }

  deleteOff () {
    this.props.deleteOff()
  }

  shiftOn () {
    this.props.shiftOn()
  }

  shiftOff () {
    this.props.shiftOff()
  }

  render () {
    const {shift, push, del} = this.props
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
        <DomGridPad active={shift}
          rgb={[250, 160, 10]}
          padPressed={this.toggleDelete}
        />
        <PushButton button={push.button('Delete')}
          dim={true}
          on={del}
          onPressed={this.deleteOn}
          onReleased={this.deleteOff}
        />
      </div>
    )
  }
}

export default connect(
  ({ push: { modifiers: { shift, del } } }) => ({ shift, del }),
  (dispatch) => ({
    deleteOn () {
      dispatch(deleteOn())
    },
    deleteOff () {
      dispatch(deleteOff())
    },
    shiftOn () {
      dispatch(shiftOn())
    },
    shiftOff () {
      dispatch(shiftOff())
    }
  })
)(PushControlModifiers)
