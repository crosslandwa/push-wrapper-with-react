'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { toggleStep } from './actions'
import PushGridPad from '../PushGridPad'
import DomGridPad from '../DomGridPad'
import arrayChunk from '../utils/arrayChunk'
import Colours from '../push/colours'

const colours = {
  off: Colours.off,
  currentStep: Colours.orange,
  currentStepPlaying: Colours.turquoise,
  activeStep: Colours.blue,
}

const colour = (active, step, currentStep) => {
    if (step === currentStep) return active ? colours.currentStepPlaying : colours.currentStep
    return active ? colours.activeStep : colours.off
}

const StepControl = ({pads, onClick, on, currentStep}) => (
  <div>
    {pads.map((pad, index) => (
      <PushGridPad
        key={index}
        velocity={on[index] ? 92 : 0}
        pad={pad}
        padPressed={() => onClick(index)}
      />
    ))}
    {arrayChunk(pads, 8).map((eightPads, row) => (
      <div key={row}>
        {eightPads.map((pad, index) => {
          const step = index + row * 8
          return (
            <DomGridPad
              key={step}
              active={on[step] || (step === currentStep)}
              rgb={colour(on[step], step, currentStep)}
              padPressed={() => onClick(step)}
            />
          )
        })}
      </div>
    ))}
  </div>
)

const mapDispatchToProps = (dispatch, { voice }) => ({
  onClick (index) {
    dispatch(toggleStep(voice, index))
  }
})

export default connect(
  ({ sequencer: {voices, currentStep} }, { voice }) => ({
    on: voices[voice].toggles,
    currentStep
  }),
  mapDispatchToProps
)(StepControl)
