'use strict'
import React from 'react'
import PushButton from './PushButton'

const randomBetweenZeroAnd = x => Math.floor(Math.random() * (x + 1))
const activeIndex = randomBetweenZeroAnd(8)

const Rainbow = (props) => (
  <div>
    {props.push.gridRow(0).map((pad, index) =>
      <PushButton key={index} active={activeIndex >= index} pushButton={pad} />
    )}
  </div>
)

export default Rainbow
