'use strict'
import React from 'react'
import TransportButton from './TransportButton'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import BpmControlKnob from '../sequencer/BpmControlKnob'
import ClipModifierButton from './ClipModifierButton'
import DeleteModifierButton from './DeleteModifierButton'
import ShiftModifierButton from './ShiftModifierButton'
import { startSequence, stopSequence, armSequencer, disarmSequencer } from '../sequencer/actions'
import { Colours } from '../push/colours'

const lhStyle = {
  display: 'flex',
  width: 112,
  flexDirection: 'column',
  justifyContent: 'space-between'
}

const rhStyle = {
  display: 'flex',
  width: 112,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export const LeftSideControls = ({push}) => (
  <div style={lhStyle}>
    <div/>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <BpmControlKnob>
        <PushKnob knob={push.tempoKnob()} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </BpmControlKnob>
      <DomKnob />
    </div>
    <div>
      <DeleteModifierButton pushButton={push.button('Delete')} />
    </div>
    <div>
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
  </div>
)

export const RightSideControls = ({push}) => (
  <div style={rhStyle}>
    <div/>
    <div>
      <ClipModifierButton pushButton={push.button('Clip')} />
    </div>
    <div/>
    <div>
      <ShiftModifierButton pushButton={push.button('Shift')} />
    </div>
    <div/>
  </div>
)
