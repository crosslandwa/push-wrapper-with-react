'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'

const PushGridSelectButton = ({button, rgb, velocity, onPressed, onReleased}) => (
  <PushGridPad
    pad={button}
    rgb={rgb}
    velocity={velocity}
    padPressed={onPressed}
    padReleased={onReleased}
  />
)

export default PushGridSelectButton
