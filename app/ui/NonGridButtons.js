'use strict'
import React from 'react'
import ModifierButton from './ModifierButton'
import TransportButton from './TransportButton'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import BpmControlKnob from '../sequencer/BpmControlKnob'
import { clipOff, clipOn, deleteOff, deleteOn, shiftOff, shiftOn } from '../push/actions'
import { startSequence, stopSequence, armSequencer, disarmSequencer } from '../sequencer/actions'
import { Colours } from '../push/colours'

const lhStyle = {
  display: 'flex',
  width: 112,
  flexDirection: 'column',
  justifyContent: 'flex-end'
}

const rhStyle = {
  display: 'flex',
  width: 112,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center'
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

export const LeftSideControls = ({push}) => (
  <div style={lhStyle}>
    <BpmControlKnob>
      <PushKnob knob={push.tempoKnob()} />
      <ClickyDraggy><DomKnob /></ClickyDraggy>
    </BpmControlKnob>
    {createModifier(push ,'Delete', deleteOn, deleteOff, 'Backspace')}
    <TransportButton
      modifier='recording'
      label='Rec'
      pushButton={push.button('Rec')}
      turnOn={armSequencer}
      turnOff={disarmSequencer}
      keypress='a'
      rgb={Colours.red}
    />
    <TransportButton
      modifier='playing'
      label='Play'
      pushButton={push.button('Play')}
      turnOn={startSequence}
      turnOff={stopSequence}
      keypress=' ' // space bar
      rgb={Colours.green}
    />
  </div>
)

export const RightSideControls = ({push}) => (
  <div style={rhStyle}>
    {createModifier(push ,'Clip', clipOn, clipOff, 'c')}
    {createModifier(push ,'Shift', shiftOn, shiftOff, 'Shift')}
  </div>
)
