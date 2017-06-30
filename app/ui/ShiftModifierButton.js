'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { shiftOff, shiftOn } from '../push/actions'
import ModifierButton from './ModifierButton'

const ShiftModifierButton = props => (
  <ModifierButton
    {...props}
    label='Shift'
    keypress='Shift'
  />
)

const mapStateToProps = ({ push: { modifiers }}, ownProps) => ({
  active: modifiers.shift
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  turnOn () {
    dispatch(shiftOn())
  },
  turnOff () {
    dispatch(shiftOff())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShiftModifierButton)
