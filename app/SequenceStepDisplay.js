'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { toggleSequence } from './actions'

const SequenceStepDisplay = ({gridRow, onClick, on}) => (
  <PadRow onClick={index => {}} pads={gridRow()} on={on} />
)

const mapDispatchToProps = (dispatch, { sequenceKey: key }) => ({
  onClick (index) {
    dispatch(toggleSequence(key, index))
  }
})

export default connect(
  ({ sequences }, { sequenceKey: key }) => ({ on: sequences[key].toggles }),
  mapDispatchToProps
)(SequenceStepDisplay)
