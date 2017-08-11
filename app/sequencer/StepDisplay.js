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

class StepPad extends React.Component {
  render () {
    const { onClick, onRelease, pad, recording, stepData, stepNumber } = this.props
    return (
      <DomGridPad
        active={stepData.isCurrentStep || stepData.hasNote}
        rgb={displayRgb(stepData, recording, domFade)}
        padPressed={() => onClick(stepNumber, stepData.id)}
        padReleased={() => onRelease(stepData.id)}
      >
        <PushGridPad
          rgb={displayRgb(stepData, recording, fade)}
          pad={pad}
          padPressed={() => onClick(stepNumber, stepData.id)}
          padReleased={() => onRelease(stepData.id)}
        />
      </DomGridPad>
    )
  }
}

const mapStateToStepProps = (state, { stepNumber, stepId, trackId }) => {
  const selectedStepIds = selectedSteps(state).map(step => step.id)
  return {
    stepData: {
      id: stepId,
      isDisplayedInEditWindow: stepId && (stepId === mostRecentlySelectedStep(state).id),
      isSelected: stepId && selectedStepIds.includes(stepId),
      isCurrentStep: stepNumber === currentStepNumberForTrack(state, trackId),
      hasNote: !!stepId,
      velocity: stepId && stepSelector(state, stepId).midiVelocity
    }
  }
}
const ConnectedStepPad = connect(mapStateToStepProps)(StepPad)

class StepDisplay extends React.Component {
  render () {
    const { pads, numberOfSteps, onClick, onRelease = () => {}, trackId, trackStepIds } = this.props
    return (
      <div style={style} >
        {pads.map((pad, stepNumber) => stepNumber < numberOfSteps
          ? (
            <ConnectedStepPad
              key={stepNumber}
              onClick={this.props.onClick}
              onRelease={onRelease}
              pad={pad}
              stepNumber={stepNumber}
              trackId={trackId}
              stepId={trackStepIds[stepNumber]}
            />
          )
          : (
            <DomGridPad rgb={Colours.black} active={true} key={stepNumber}>
              <PushGridPad rgb={Colours.black} pad={pad} />
            </DomGridPad>
          )
        )}
      </div>
    )
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.trackId !== nextProps.trackId)
      || (this.props.numberOfSteps !== nextProps.numberOfSteps)
      || (this.props.trackStepIds.toString() !== nextProps.trackStepIds.toString())
  }
}

const mapStateToProps = (state, { pads, trackId }) => {
  const track = trackSelector(state, trackId)
  const selectedStepIds = selectedSteps(state).map(step => step.id)
  return {
    numberOfSteps: track.numberOfSteps,
    recording: isRecording(state),
    trackStepIds: track.stepIds
  }
}

export default connect(mapStateToProps)(StepDisplay)
