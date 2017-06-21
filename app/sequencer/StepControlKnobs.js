'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import StepPitchControl from './StepPitchControl'
import StepVelocityControl from './StepVelocityControl'
import ChannelKnobs from '../ui/ChannelKnobs'
import { selectedStep } from '../selectors'

const StepControlKnobs = ({knobs, stepId}) => {
  return (
    <ChannelKnobs>
      <StepPitchControl stepId={stepId} >
        <PushKnob knob={knobs[0]} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </StepPitchControl>
      <StepVelocityControl stepId={stepId} >
        <PushKnob knob={knobs[1]} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </StepVelocityControl>
    </ChannelKnobs>
  )
}

const mapStateToProps = (state, { trackId }) => ({ stepId: selectedStep(state).id })

export default connect(mapStateToProps)(StepControlKnobs)
