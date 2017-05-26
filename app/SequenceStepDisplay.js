'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { startSequence } from './sequencer/actions'

const SequenceStepDisplay = ({pads, startSequence, currentStep}) => (
  <PadRow
    onClick={startSequence}
    pads={pads}
    on={pads.map((pad, index) => index === currentStep)}
    narrow={true}
  />
)

export default connect(
  ({ sequencer: { currentStep } }) => ({ currentStep }),
  dispatch => ({
    startSequence (index) {
      dispatch(startSequence(index))
    }
  })
)(SequenceStepDisplay)
