'use strict'
import React from 'react'
import PushButton from './PushButton'

const zeroTo = x => [...Array(x).keys()]

const Rainbow = (props) => (
  <div>
    {zeroTo(8).map(index =>
      <PushButton key={index} pushButton={props.push.grid.x[index + 1].y[1]} />
    )}
  </div>
)

export default Rainbow
