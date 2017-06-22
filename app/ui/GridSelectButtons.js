'use strict'
import React from 'react'
import DomGridButton from '../push/DomGridButton'
import TrackSelectButton from '../voices/TrackSelectButton'
import PatternSelect from '../sequencer/PatternSelect'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'transparent'
}

const GridSelectButtons = ({trackIds, patternIds, push}) => (
  <div style={style}>
    {[...Array(8).keys()].map(index => <DomGridButton key={index} />)}
    {trackIds.map((trackId, index) => (
      <TrackSelectButton
        key={index}
        button={push.gridSelectButtons()[index]}
        trackId={trackId}
      />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <PatternSelect
        key={i}
        patternId={patternIds[i]}
        button={push.gridSelectButtons()[i + 4]}
      />
    ))}
  </div>
)

export default GridSelectButtons
