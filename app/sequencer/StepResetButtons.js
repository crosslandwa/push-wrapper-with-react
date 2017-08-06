'use strict'
import React from 'react'
import { Colours } from '../push/colours'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'

const StepResetButtons = ({buttons, style}) => (
  <div style={style} >
    {[...Array(8).keys()].map(index => (
      <DomGridButton
        key={index}
        active={false}
        rgb={Colours.off}
      >
        <PushGridSelectButton
          button={buttons[index]}
          rgb={Colours.off}
        />
      </DomGridButton>
    ))}
  </div>
)

export default StepResetButtons
