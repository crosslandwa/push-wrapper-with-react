'use strict'

// Feels like this is doing too much, specifically parsing state and passing
// it back up in onClick/padReleased callbacks...
// I'm concerned this will be re-rendering all the time...

import React from 'react'
import { connect } from 'react-redux'
import PushGridPad from '../push/PushGridPad'
import DomGridPad from '../push/DomGridPad'
import arrayChunk from '../utils/arrayChunk'
import { Colours, fade, domFade } from '../push/colours'
import { stepSelector } from '../selectors'

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
        padPressed={() => onClick(stepNumber, stepData[stepNumber].id)}
        padReleased={() => onRelease(stepData[stepNumber].id)}
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
              padPressed={() => onClick(stepNumber, stepData[stepNumber].id)}
              padReleased={() => onRelease(stepData[stepNumber].id)}
            />
          )
        })}
      </div>
    ))}
  </div>
)


const mapStateToProps = (state, { trackId }) => {
  const { entities: {tracks}, sequencer: {currentStep} } = state
  return {
    stepData: [...Array(tracks.byId[trackId].numberOfSteps).keys()]
      .map(stepNumber => {
        const stepId = tracks.byId[trackId].stepIds[stepNumber]
        return {
          id: stepId,
          isCurrentStep: stepNumber === currentStep,
          hasNote: !!stepId,
          velocity: stepId && stepSelector(state, stepId).midiVelocity
        }
      })
  }
}
export default connect(mapStateToProps)(StepDisplay)
