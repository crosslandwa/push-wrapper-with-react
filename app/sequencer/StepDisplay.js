'use strict'

// Feels like this is doing too much, specifically parsing state and passing
// it back up in onClick/padReleased callbacks...
// I'm concerned this will be re-rendering all the time...

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

const StepDisplay = ({pads, onClick = () => {}, onRelease = () => {}, steps, stepsDisplay, underEdit}) => (
  <div>
    {pads.map((pad, step) => (
      <PushGridPad
        key={step}
        rgb={displayRgb(stepsDisplay[step], fade)}
        pad={pad}
        padPressed={() => onClick(step, steps[step])}
        padReleased={() => onRelease(step, underEdit[step])}
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
              padPressed={() => onClick(step, steps[step])}
              padReleased={() => onRelease(step, underEdit[step])}
            />
          )
        })}
      </div>
    ))}
  </div>
)

export default connect(
  ({ sequencer: {voices, currentStep} }, { voice }) => ({
    underEdit: voices[voice].steps.map((step, index) => voices[voice].stepsUnderEdit.includes(index)),
    steps: voices[voice].steps,
    stepsDisplay: voices[voice].steps
      .map((step, index) => ({
        isCurrentStep: index === currentStep,
        hasNote: step.midiVelocity !== null,
        velocity: step.midiVelocity
      }))
  })
)(StepDisplay)
