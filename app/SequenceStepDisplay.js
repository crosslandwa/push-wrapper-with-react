'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { toggleSequence } from './actions'

const SequenceStepDisplay = ({gridRow, currentStep}) => (
  <PadRow
    onClick={index => {}}
    pads={gridRow()}
    on={gridRow().map((pad, index) => index === currentStep)}
  />
)

export default connect(
  ({ sequences: { currentStep } }) => ({ currentStep })
)(SequenceStepDisplay)
