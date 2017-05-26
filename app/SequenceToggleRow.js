'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { toggleStep } from './sequencer/actions'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'
import arrayChunk from './utils/arrayChunk'

const SequenceToggleRow = ({pads, onClick, on}) => (
  <div>
    {pads.map((pad, index) => (
      <PushGridPad
        key={index}
        velocity={on[index] ? 92 : 0}
        pad={pad}
        padPressed={() => onClick(index)}
      />
    ))}
    {arrayChunk(pads, 8).map((eightPads, row) => (
      <div key={row}>
        {eightPads.map((pad, index) => (
          <DomGridPad
            key={index + row * 8}
            active={on[index + row * 8]}
            padPressed={() => onClick(index + row * 8)}
          />
        ))}
      </div>
    ))}
  </div>
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
