'use strict'

// Feels like this is doing too much, specifically parsing state and passing
// it back up in onClick/padReleased callbacks...
// I'm concerned this will be re-rendering all the time...

import React from 'react'
import { connect } from 'react-redux'
import PushGridPad from '../push/PushGridPad'
import DomGridPad from '../push/DomGridPad'
import { Colours, fade, domFade } from '../push/colours'
import { currentStepNumberForTrack, stepSelector, trackSelector } from '../selectors'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}

const displayRgb = ({isCurrentStep, hasNote, velocity}, fadeEffect = x => x) => {
  if (isCurrentStep) return hasNote ? Colours.turquoise : Colours.orange
  return hasNote ? fadeEffect(Colours.blue, velocity) : Colours.off
}

const StepDisplay = ({pads, onClick, onRelease = () => {}, stepData}) => (
  <div style={style} >
    {pads.map((pad, stepNumber) => (
      <DomGridPad
        key={stepNumber}
        active={stepData[stepNumber].isCurrentStep || stepData[stepNumber].hasNote}
        rgb={displayRgb(stepData[stepNumber], domFade)}
        padPressed={() => onClick(stepNumber, stepData[stepNumber].id)}
        padReleased={() => onRelease(stepData[stepNumber].id)}
      >
        <PushGridPad
          key={stepNumber}
          rgb={displayRgb(stepData[stepNumber], fade)}
          pad={pad}
          padPressed={() => onClick(stepNumber, stepData[stepNumber].id)}
          padReleased={() => onRelease(stepData[stepNumber].id)}
        />
      </DomGridPad>
    ))}
  </div>
)

const mapStateToProps = (state, { trackId }) => {
  const track = trackSelector(state, trackId)
  return {
    stepData: [...Array(track.numberOfSteps).keys()].map(stepNumber => {
      const stepId = track.stepIds[stepNumber]
      return {
        id: stepId,
        isCurrentStep: stepNumber === currentStepNumberForTrack(state, track.id),
        hasNote: !!stepId,
        velocity: stepId && stepSelector(state, stepId).midiVelocity
      }
    })
  }
}

export default connect(mapStateToProps)(StepDisplay)
