'use strict'
import React from 'react'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'

const style = {
  display: 'flex',
  width: 112,
  flexDirection: 'column',
  justifyContent: 'flex-end'
}

const LeftSideControls = ({push}) => (
  <div style={style}>
    <PushControlModifiers push={push} />
    <TransportControls push={push} />
  </div>
)

export default LeftSideControls
