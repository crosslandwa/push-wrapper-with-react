'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomButton from '../push/DomButton'
import PushButton from '../push/PushButton'

const ModifierButton = ({active, label, pushButton, turnOff, turnOn}) => (
  <DomButton active={active}
    label={label}
    padPressed={() => active ? turnOff() : turnOn()}
  >
    <PushButton button={pushButton}
      dim={true}
      on={active}
      onPressed={turnOn}
      onReleased={turnOff}
    />
  </DomButton>
)

const mapStateToProps = ({ push: { modifiers }}, ownProps) => ({
  active: modifiers[ownProps.modifier]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  turnOn () {
    dispatch(ownProps.turnOn())
  },
  turnOff () {
    dispatch(ownProps.turnOff())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModifierButton)
