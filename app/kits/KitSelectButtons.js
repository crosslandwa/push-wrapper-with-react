'use strict'
import React from 'react'
import { Colours } from '../push/colours'
import KitSelectButton from './KitSelectButton'

const KitSelectButtons = ({buttons, kitIds, style}) => (
  <div style={style} >
    {[...Array(8).keys()].map(index => (
      <KitSelectButton
        key={kitIds[index] || index}
        button={buttons[index]}
        kitId={kitIds[index]}
      />
    ))}
  </div>
)

export default KitSelectButtons
