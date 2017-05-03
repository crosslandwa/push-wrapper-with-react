'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { startSequence, stopSequence } from './actions'
import DomGridPad from './DomGridPad'
import PushButton from './PushButton'

const SequenceStartStop = ({button, playing, stop, start}) => {
  const togglePlay = () => playing ? stop() : start()
  return (
    <div>
      <DomGridPad padPressed={togglePlay} active={playing} />
      <PushButton button={button} dim={true} on={playing} pressed={togglePlay} />
    </div>
  )
}

export default connect(
  ({ sequences: { playing } }) => ({ playing }),
  (dispatch) => ({
    start () {
      dispatch(startSequence())
    },
    stop () {
      dispatch(stopSequence())
    }
  })
)(SequenceStartStop)
