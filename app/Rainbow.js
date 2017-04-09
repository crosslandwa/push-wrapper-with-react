'use strict'
import React from 'react'
import PushButton from './PushButton'

const zeroTo = x => [...Array(x + 1).keys()]
const oneTo = x => zeroTo(x - 1).map(i => ++i)

const randomBetweenZeroAnd = x => Math.floor(Math.random() * (x + 1))
const index = randomBetweenZeroAnd(8)

const Rainbow = (props) => (
  <div>
    {oneTo(8).map(x =>
      <PushButton key={x} active={index >= x} pushButton={props.push.grid.x[x].y[1]} />
    )}
  </div>
)

export default Rainbow
