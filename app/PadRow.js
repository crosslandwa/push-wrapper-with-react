'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'

const PadRow = ({pads, onClick, on}) => (
  <div className='padRow'>
    {pads.map((pad, index) => (
      <PushGridPad
        key={index}
        velocity={on[index] ? 92 : 0}
        pad={pad}
        padPressed={() => onClick(index)}
      />
    ))}
    {pads.map((pad, index) => (
      <DomGridPad
        key={index}
        active={on[index]}
        padPressed={() => onClick(index)}
      />
    ))}
  </div>
)

export default PadRow
