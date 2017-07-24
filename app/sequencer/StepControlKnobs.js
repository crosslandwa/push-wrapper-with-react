'use strict'
import React from 'react'
import { connect } from 'react-redux'
import StepPitchControl from './StepPitchControl'
import StepVelocityControl from './StepVelocityControl'
import ChannelKnobs from '../ui/ChannelKnobs'
import { selectedStep } from '../selectors'
import DomKnob from '../push/DomKnob'

const StepControlKnobs = ({knobs, stepId}) => {
  return (
    <ChannelKnobs>
      <StepPitchControl stepId={stepId} knob={knobs[0]} />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <StepVelocityControl stepId={stepId} knob={knobs[7]} />
    </ChannelKnobs>
  )
}

const mapStateToProps = (state, { trackId }) => ({ stepId: selectedStep(state).id })

export default connect(mapStateToProps)(StepControlKnobs)
