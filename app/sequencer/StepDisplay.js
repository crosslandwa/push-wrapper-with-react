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

const displayRgb = (fadeEffect, { isCurrentStep, isDisplayedInEditWindow, isSelected, hasNote, velocity, recording }) => {
  if (isDisplayedInEditWindow) return Colours.yellow
  if (isSelected) return Colours.orange
  if (isCurrentStep) return hasNote ? Colours.turquoise : (recording ? Colours.red : Colours.green)
  return hasNote ? fadeEffect(Colours.blue, velocity) : Colours.off
}

class StepPad extends React.Component {
  render () {
    const { hasNote, isCurrentStep, onClick, onRelease, pad, stepId, stepNumber } = this.props
    return (
      <DomGridPad
        active={isCurrentStep || hasNote}
        rgb={displayRgb(domFade, this.props)}
        padPressed={() => onClick(stepNumber, stepId)}
        padReleased={() => onRelease(stepId)}
      >
        <PushGridPad
          rgb={displayRgb(fade, this.props)}
          pad={pad}
          padPressed={() => onClick(stepNumber, stepId)}
          padReleased={() => onRelease(stepId)}
        />
      </DomGridPad>
    )
  }
}

const mapStateToStepProps = (state, { stepNumber, stepId, trackId }) => {
  return stepId
    ? {
      isDisplayedInEditWindow: stepId === mostRecentlySelectedStep(state).id,
      isSelected: selectedSteps(state).map(step => step.id).includes(stepId),
      isCurrentStep: stepNumber === currentStepNumberForTrack(state, trackId),
      hasNote: true,
      velocity: stepSelector(state, stepId).midiVelocity
    }
    : {
      isDisplayedInEditWindow: false,
      isSelected: false,
      isCurrentStep: stepNumber === currentStepNumberForTrack(state, trackId),
      hasNote: false
    }
}
const ConnectedStepPad = connect(mapStateToStepProps)(StepPad)

class StepDisplay extends React.Component {
  render () {
    const { pads, numberOfSteps, onClick, onRelease = () => {}, recording, trackId, trackStepIds } = this.props
    return (
      <div style={style} >
        {pads.map((pad, stepNumber) => stepNumber < numberOfSteps
          ? (
            <ConnectedStepPad
              key={stepNumber}
              onClick={this.props.onClick}
              onRelease={onRelease}
              pad={pad}
              recording={recording}
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
      || (this.props.recording !== nextProps.recording)
      || (this.props.trackStepIds.toString() !== nextProps.trackStepIds.toString())
  }
}

const mapStateToProps = (state, { pads, trackId }) => {
  const track = trackSelector(state, trackId)
  return {
    numberOfSteps: track.numberOfSteps,
    recording: isRecording(state),
    trackStepIds: track.stepIds
  }
}

export default connect(mapStateToProps)(StepDisplay)
