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

const StepDisplay = ({pads, onClick, onRelease = () => {}, steps, stepsDisplay, stepsUnderEdit}) => (
  <div>
    {pads.map((pad, stepNumber) => (
      <PushGridPad
        key={stepNumber}
        rgb={displayRgb(stepsDisplay[stepNumber], fade)}
        pad={pad}
        padPressed={() => onClick(stepNumber, steps[stepNumber])}
        padReleased={() => onRelease(stepNumber, stepsUnderEdit.includes(stepNumber))}
      />
    ))}
    {arrayChunk(pads, 8).map((eightPads, row) => (
      <div key={row}>
        {eightPads.map((pad, index) => {
          const stepNumber = index + row * 8
          return (
            <DomGridPad
              key={stepNumber}
              active={stepsDisplay[stepNumber].isCurrentStep || stepsDisplay[stepNumber].hasNote}
              rgb={displayRgb(stepsDisplay[stepNumber], domFade)}
              padPressed={() => onClick(stepNumber, steps[stepNumber])}
              padReleased={() => onRelease(stepNumber, steps[stepNumber], stepsUnderEdit.includes(stepNumber))}
            />
          )
        })}
      </div>
    ))}
  </div>
)

export default connect(
  ({ entities: {steps}, sequencer: {voices, currentStep} }, { voice }) => ({
    stepsUnderEdit: voices[voice].stepsUnderEdit,
    steps: voices[voice].stepsById.map(id => steps.byId[id]),
    stepsDisplay: voices[voice].stepsById
      .map((id, index) => ({
        isCurrentStep: index === currentStep,
        hasNote: steps.byId[id].midiVelocity !== null,
        velocity: steps.byId[id].midiVelocity
      }))
  })
)(StepDisplay)
