'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChannelKnobs from '../ui/ChannelKnobs'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PushKnob from '../push/PushKnob'
import { changeStepDecayBy, changeStepPitchBy, changeStepVelocityBy } from './actions'

const Knob = connect(
  null,
  (dispatch, ownProps) => bindActionCreators(ownProps.actions, dispatch)
)((props) => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
))

const StepControlKnobs = ({knobs}) => {
  return (
    <ChannelKnobs>
      <Knob knob={knobs[0]} actions={{ onTurned: changeStepPitchBy }}/>
      <DomKnob />
      <Knob knob={knobs[2]} actions={{ onTurned: changeStepDecayBy }}/>
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <Knob knob={knobs[7]} actions={{ onTurned: changeStepVelocityBy }}/>
    </ChannelKnobs>
  )
}

export default StepControlKnobs
