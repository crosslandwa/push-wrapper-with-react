'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { clipOff, clipOn } from '../push/actions'
import ModifierButton from './ModifierButton'

const ClipModifierButton = props => (
  <ModifierButton
    {...props}
    label='Clip'
    keypress='c'
  />
)

const mapStateToProps = ({ push: { modifiers }}, ownProps) => ({
  active: modifiers.clip
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  turnOn () {
    dispatch(clipOn())
  },
  turnOff () {
    dispatch(clipOff())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ClipModifierButton)
