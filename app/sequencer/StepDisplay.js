'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushGridPad from '../push/PushGridPad'
import DomGridPad from '../push/DomGridPad'
import { Colours, fade, domFade } from '../push/colours'
import { currentStepNumberForTrack, isRecording, mostRecentlySelectedStep, selectedSteps, stepSelector, trackSelector } from '../selectors'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}

const displayRgb = ({isCurrentStep, isDisplayedInEditWindow, isSelected, hasNote, velocity}, recording, fadeEffect) => {
  if (isDisplayedInEditWindow) return Colours.yellow
  if (isSelected) return Colours.orange
  if (isCurrentStep) return hasNote
    ? Colours.turquoise
    : recording ? Colours.red : Colours.green
  return hasNote ? fadeEffect(Colours.blue, velocity) : Colours.off
}

const StepDisplay = ({pads, numberOfSteps, onClick, onRelease = () => {}, recording, stepData}) => (
  <div style={style} >
    {pads.map((pad, stepNumber) => stepNumber < numberOfSteps
      ? (
        <DomGridPad
          key={stepNumber}
          active={stepData[stepNumber].isCurrentStep || stepData[stepNumber].hasNote}
          rgb={displayRgb(stepData[stepNumber], recording, domFade)}
          padPressed={() => onClick(stepNumber, stepData[stepNumber].id)}
          padReleased={() => onRelease(stepData[stepNumber].id)}
        >
          <PushGridPad
            key={stepNumber}
            rgb={displayRgb(stepData[stepNumber], recording, fade)}
            pad={pad}
            padPressed={() => onClick(stepNumber, stepData[stepNumber].id)}
            padReleased={() => onRelease(stepData[stepNumber].id)}
          />
        </DomGridPad>
      )
      : (
        <DomGridPad rgb={Colours.black} active={true} key={stepNumber}>
          <PushGridPad rgb={Colours.black} pad={pad} />
        </DomGridPad>
      )
    )}
  </div>
)

const mapStateToProps = (state, { pads, trackId }) => {
  const track = trackSelector(state, trackId)
  const allSelectedSteps = selectedSteps(state)
  const selectedStepIds = allSelectedSteps.map(step => step.id)
  return {
    numberOfSteps: track.numberOfSteps,
    recording: isRecording(state),
    stepData: pads.map((pad, stepNumber) => {
      const stepId = track.stepIds[stepNumber]
      return {
        id: stepId,
        isDisplayedInEditWindow: stepId && (stepId === mostRecentlySelectedStep(state).id),
        isSelected: stepId && selectedStepIds.includes(stepId),
        isCurrentStep: stepNumber === currentStepNumberForTrack(state, track.id),
        hasNote: !!stepId,
        velocity: stepId && stepSelector(state, stepId).midiVelocity
      }
    })
  }
}

export default connect(mapStateToProps)(StepDisplay)
