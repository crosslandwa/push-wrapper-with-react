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

const StepDisplay = ({pads, onClick, onRelease = () => {}, stepData}) => (
  <div>
    {pads.map((pad, stepNumber) => (
      <PushGridPad
        key={stepNumber}
        rgb={displayRgb(stepData[stepNumber], fade)}
        pad={pad}
        padPressed={() => onClick(stepNumber, stepData[stepNumber].id, stepData[stepNumber].velocity)}
        padReleased={() => onRelease(stepNumber, stepData[stepNumber].id, stepData[stepNumber].underEdit)}
      />
    ))}
    {arrayChunk(pads, 8).map((eightPads, row) => (
      <div key={row}>
        {eightPads.map((pad, index) => {
          const stepNumber = index + row * 8
          return (
            <DomGridPad
              key={stepNumber}
              active={stepData[stepNumber].isCurrentStep || stepData[stepNumber].hasNote}
              rgb={displayRgb(stepData[stepNumber], domFade)}
              padPressed={() => onClick(stepNumber, stepData[stepNumber].id, stepData[stepNumber].velocity)}
              padReleased={() => onRelease(stepNumber, stepData[stepNumber].id, stepData[stepNumber].underEdit)}
            />
          )
        })}
      </div>
    ))}
  </div>
)

export default connect(
  ({ entities: {steps}, sequencer: {voices, currentStep} }, { voice }) => ({
    stepData: voices[voice].stepsById
      .map((id, index) => ({
        id,
        isCurrentStep: index === currentStep,
        hasNote: steps.byId[id].midiVelocity !== null,
        underEdit: voices[voice].stepsUnderEdit.includes(id),
        velocity: steps.byId[id].midiVelocity
      }))
  })
)(StepDisplay)
