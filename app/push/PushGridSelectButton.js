'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'

const PushGridSelectButton = ({button, children, rgb, velocity, onPressed, onReleased}) => (
  <PushGridPad
    pad={button}
    rgb={rgb}
    velocity={velocity}
    padPressed={onPressed}
    padReleased={onReleased}
  >
    {children}
  </PushGridPad>
)

export default PushGridSelectButton
