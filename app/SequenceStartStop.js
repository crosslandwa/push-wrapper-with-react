'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { startSequence, stopSequence } from './actions'
import DomGridPad from './DomGridPad'
import PushButton from './PushButton'

const SequenceStartStop = ({button, playing, startSequence, stopSequence}) => (
  <div>
    <DomGridPad
      padPressed={() => playing ? stopSequence() : startSequence()}
      active={playing}
    />
    <PushButton
      button={button}
      dim={true}
      on={playing}
      pressed={() => playing ? stopSequence() : startSequence()}
    />
  </div>
)

export default connect(
  ({ sequences: { playing } }) => ({ playing }),
  (dispatch) => ({
    startSequence () {
      dispatch(startSequence())
    },
    stopSequence () {
      dispatch(stopSequence())
    }
  })
)(SequenceStartStop)
