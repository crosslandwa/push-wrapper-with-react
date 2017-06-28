'use strict'
import React from 'react'
import PatternSelect from '../sequencer/PatternSelect'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}

const PatternSelectPads = ({pads, patternIds}) => (
  <div style={style} >
    {pads.map((pad, i) => (
      <PatternSelect
        key={i}
        patternId={patternIds[i]}
        pad={pad}
      />
    ))}
  </div>
)

export default PatternSelectPads
