'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'
import arrayChunk from './utils/arrayChunk'

const PadRow = ({pads, onClick, on, narrow}) => (
  <div className='padRow'>
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
            narrow={narrow}
          />
        ))}
      </div>
    ))}
  </div>
)

export default PadRow
