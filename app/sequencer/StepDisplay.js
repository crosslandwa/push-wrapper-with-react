'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushGridPad from '../push/PushGridPad'
import DomGridPad from '../push/DomGridPad'
import arrayChunk from '../utils/arrayChunk'
import {Colours, fade, domFade} from '../push/colours'

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

const StepDisplay = ({pads, onClick, on, currentStep, displayVelocity}) => (
  <div>
    {pads.map((pad, index) => (
      <PushGridPad
        key={index}
        velocity={displayVelocity[index]}
        rgb={colour(on[index], index, currentStep)}
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
              active={displayVelocity[step] > 0}
              rgb={domFade(colour(on[step], step, currentStep), displayVelocity[step])}
              padPressed={() => onClick(step)}
            />
          )
        })}
      </div>
    ))}
  </div>
)

const mapDispatchToProps = (dispatch, { onClick }) => ({
  onClick (index) {
    onClick && onClick(index)
  }
})

export default connect(
  ({ sequencer: {voices, currentStep} }, { voice }) => ({
    displayVelocity: voices[voice].steps
      .map((step, index) => (currentStep === index)
        ? 127
        : (step.midiVelocity !== null) ? step.midiVelocity : 0
      ),
    on: voices[voice].steps.map(step => step.midiVelocity !== null),
    currentStep
  }),
  mapDispatchToProps
)(StepDisplay)
