'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { startSequence } from './sequencer/actions'
import PushGridPad from './PushGridPad'
import DomPushButton from './push/DomPushButton'
import arrayChunk from './utils/arrayChunk'

const SequenceStepDisplay = ({pads, startSequence, currentStep}) => (
  <div>
    {pads.map((pad, index) => (
      <PushGridPad
        key={index}
        velocity={(index === currentStep) ? 92 : 0}
        pad={pad}
        padPressed={() => startSequence(index)}
      />
    ))}
    {arrayChunk(pads, 8).map((eightPads, row) => (
      <div key={row}>
        {eightPads.map((pad, index) => (
          <DomPushButton
            key={index + row * 8}
            active={(index + row * 8) === currentStep}
            padPressed={() => startSequence(index + row * 8)}
          />
        ))}
      </div>
    ))}
  </div>
)

export default connect(
  ({ sequencer: { currentStep } }) => ({ currentStep }),
  dispatch => ({
    startSequence (index) {
      dispatch(startSequence(index))
    }
  })
)(SequenceStepDisplay)
