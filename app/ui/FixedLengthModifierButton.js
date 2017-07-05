'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { fixedLengthOff, fixedLengthOn } from '../push/actions'
import ModifierButton from './ModifierButton'

const FixedLengthModifierButton = props => (
  <ModifierButton
    {...props}
    label='Fixed Length'
    keypress='f'
  />
)

const mapStateToProps = ({ push: { modifiers }}, ownProps) => ({
  active: modifiers.fixedLength
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  turnOn () {
    dispatch(fixedLengthOn())
  },
  turnOff () {
    dispatch(fixedLengthOff())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FixedLengthModifierButton)
