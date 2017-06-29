'use strict'
import React from 'react'
import TransportControls from './TransportControls'
import ModifierButton from './ModifierButton'
import { clipOff, clipOn, deleteOff, deleteOn, shiftOff, shiftOn } from '../push/actions'

const style = {
  display: 'flex',
  width: 112,
  flexDirection: 'column',
  justifyContent: 'flex-end'
}

const createModifier = (push, name, on, off, keypress='') => (
  <ModifierButton
    modifier={name.toLowerCase()}
    label={name}
    pushButton={push.button(name)}
    turnOn={on}
    turnOff={off}
    keypress={keypress}
  />
)

const LeftSideControls = ({push}) => (
  <div style={style}>
    {createModifier(push ,'Clip', clipOn, clipOff, 'c')}
    {createModifier(push ,'Delete', deleteOn, deleteOff, 'Backspace')}
    {createModifier(push ,'Shift', shiftOn, shiftOff, 'Shift')}
    <TransportControls push={push} />
  </div>
)

export default LeftSideControls
