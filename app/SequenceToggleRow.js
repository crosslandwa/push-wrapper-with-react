'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { toggleStep } from './sequencer/actions'

const SequenceToggleRow = ({pads, onClick, on}) => (
  <PadRow onClick={onClick} pads={pads} on={on} />
)

const mapDispatchToProps = (dispatch, { voice }) => ({
  onClick (index) {
    dispatch(toggleStep(voice, index))
  }
})

export default connect(
  ({ sequencer }, { voice }) => ({ on: sequencer.voices[voice].toggles }),
  mapDispatchToProps
)(SequenceToggleRow)
