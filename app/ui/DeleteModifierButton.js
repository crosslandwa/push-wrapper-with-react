'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { deleteOff, deleteOn } from '../push/actions'
import ModifierButton from './ModifierButton'

const DeleteModifierButton = props => (
  <ModifierButton
    {...props}
    label='Delete'
    keypress='Backspace'
  />
)

const mapStateToProps = ({ push: { modifiers }}, ownProps) => ({
  active: modifiers['delete']
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  turnOn () {
    dispatch(deleteOn())
  },
  turnOff () {
    dispatch(deleteOff())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModifierButton)
