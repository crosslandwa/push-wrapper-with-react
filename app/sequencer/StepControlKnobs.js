'use strict'
import React from 'react'
import { connect } from 'react-redux'
import StepDecayControl from './StepDecayControl'
import StepPitchControl from './StepPitchControl'
import StepVelocityControl from './StepVelocityControl'
import ChannelKnobs from '../ui/ChannelKnobs'
import DomKnob from '../push/DomKnob'

const StepControlKnobs = ({knobs}) => {
  return (
    <ChannelKnobs>
      <StepPitchControl knob={knobs[0]} />
      <DomKnob />
      <StepDecayControl knob={knobs[2]} />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <StepVelocityControl knob={knobs[7]} />
    </ChannelKnobs>
  )
}

export default StepControlKnobs
