'use strict'
import React from 'react'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'

const ChromaticKeyboardPad = ({ padPressed, pad, rgb = Colours.white }) => (
  <DomGridPad
    padPressed={padPressed}
    active={true}
    rgb={rgb}
  >
    <PushGridPad
      rgb={rgb}
      pad={pad}
      padPressed={padPressed}
    />
  </DomGridPad>
)

export default ChromaticKeyboardPad
