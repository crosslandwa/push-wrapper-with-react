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
  ({ sequences }, { sequenceKey: key }) => ({ on: sequences[key].toggles }),
  mapDispatchToProps
)(SequenceToggleRow)
