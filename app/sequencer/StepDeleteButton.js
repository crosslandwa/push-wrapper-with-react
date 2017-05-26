'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { deleteModeOff, deleteModeOn } from './actions'

const StepDeleteButton = ({ padPressed, padReleased, pad, rgb }) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      padReleased={padReleased}
      active={true}
      className="pad"
      rgb={rgb}
    />
    <PushGridPad
      velocity={100}
      rgb = {rgb}
      pad={pad}
      padPressed={padPressed}
      padReleased={padReleased}
    />
  </div>
)

export default connect(
  ({ sequencer: { voices: seqVoices } }, { voice }) => ({
    deleteMode: seqVoices[voice].deleteMode,
    rgb: seqVoices[voice].deleteMode ? [250, 10, 0] : [110, 15, 0]
  }),
  (dispatch, { voice }) => ({
    padPressed () {
      dispatch(deleteModeOn(voice))
    },
    padReleased () {
      dispatch(deleteModeOff(voice))
    }
  })
)(StepDeleteButton)
