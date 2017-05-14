'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { toggleSequence } from './actions'

const SequenceToggleRow = ({gridRow, onClick, on}) => (
  <PadRow onClick={onClick} pads={gridRow()} on={on} />
)

const mapDispatchToProps = (dispatch, { sequenceKey: key }) => ({
  onClick (index) {
    dispatch(toggleSequence(key, index))
  }
})

export default connect(
  ({ sequencer }, { sequenceKey: key }) => ({ on: sequencer[key].toggles }),
  mapDispatchToProps
)(SequenceToggleRow)
