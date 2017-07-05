'use strict'
import React from 'react'
import PatternLengthPad from '../sequencer/PatternLengthPad'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}

const PatternLengthPads = ({pads, trackId}) => (
  <div style={style} >
    {pads.map((pad, i) => (
      <PatternLengthPad
        key={i}
        trackId={trackId}
        pad={pad}
        length={i + 1}
      />
    ))}
  </div>
)

export default PatternLengthPads
