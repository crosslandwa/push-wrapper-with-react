'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushGridPad from '../push/PushGridPad'
import DomGridPad from '../push/DomGridPad'
import arrayChunk from '../utils/arrayChunk'
import {Colours, fade, domFade} from '../push/colours'

const displayRgb = ({isCurrentStep, hasNote, velocity}, fadeEffect = x => x) => {
  if (isCurrentStep) return hasNote ? Colours.turquoise : Colours.orange
  return hasNote ? fadeEffect(Colours.blue, velocity) : Colours.off
}

const StepDisplay = ({pads, onClick, stepsDisplay}) => (
  <div>
    {pads.map((pad, index) => (
      <PushGridPad
        key={index}
        rgb={displayRgb(stepsDisplay[index], fade)}
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
              active={stepsDisplay[step].isCurrentStep || stepsDisplay[step].hasNote}
              rgb={displayRgb(stepsDisplay[step], domFade)}
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
    stepsDisplay: voices[voice].steps
      .map((step, index) => ({
        isCurrentStep: index === currentStep,
        hasNote: step.midiVelocity !== null,
        velocity: step.midiVelocity
      }))
  }),
  mapDispatchToProps
)(StepDisplay)
