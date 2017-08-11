'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChannelKnobs from '../ui/ChannelKnobs'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PushKnob from '../push/PushKnob'
import { changeStepDecayBy, changeStepPitchBy, changeStepVelocityBy } from './stepsActions'

const Knob = (props) => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const StepControlKnobs = (props) => {
  const { knobs } = props
  return (
    <ChannelKnobs>
      <Knob knob={knobs[0]} onTurned={props.changePitch} />
      <DomKnob />
      <Knob knob={knobs[2]} onTurned={props.changeDecay} />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <Knob knob={knobs[7]} onTurned={props.changeVelocity} />
    </ChannelKnobs>
  )
}

export default connect(null, {
  changeDecay: changeStepDecayBy,
  changePitch: changeStepPitchBy,
  changeVelocity: changeStepVelocityBy
})(StepControlKnobs)
