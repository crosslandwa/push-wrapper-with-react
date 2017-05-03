'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { startSequence } from './actions'

const SequenceStepDisplay = ({gridRow, startSequence, currentStep}) => (
  <PadRow
    onClick={startSequence}
    pads={gridRow()}
    on={gridRow().map((pad, index) => index === currentStep)}
  />
)

export default connect(
  ({ sequences: { currentStep } }) => ({ currentStep }),
  dispatch => ({
    startSequence (index) {
      dispatch(startSequence(index))
    }
  })
)(SequenceStepDisplay)
