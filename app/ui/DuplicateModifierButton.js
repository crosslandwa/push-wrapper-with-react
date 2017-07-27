'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { duplicateOn, duplicateOff } from '../push/actions'
import ModifierButton from './ModifierButton'

const DuplicateModifierButton = props => (
  <ModifierButton
    {...props}
    label='Duplicate'
    keypress='d'
  />
)

const mapStateToProps = ({ push: { modifiers }}, ownProps) => ({
  active: modifiers.duplicate
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  turnOn () {
    dispatch(duplicateOn())
  },
  turnOff () {
    dispatch(duplicateOff())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateModifierButton)
