'use strict'
import React from 'react'
import { connect } from 'react-redux'
import LCD from './LCD'
import { currentBpm, currentPattern, currentSample, currentTrack, currentVoice, selectedStep } from '../selectors'

const LCDComponent = (props) => <LCD {...props} />

const voiceDisplay = (state, ownProps) => {
  const trackIndex = currentPattern(state).trackIds.indexOf(currentTrack(state).id)
  return {
    data: [
      [currentVoice(state).pitch, currentSample(state).name, currentBpm(state)],
      ['pitch', 'sample', 'bpm'],
      [`voice: ${trackIndex}`]
    ]
  }
}

const stepDisplay = (state, ownProps) => {
  const track = currentTrack(state)
  const step = selectedStep(state)
  const stepNumber = track.stepIds.indexOf(step.id)
  return {
    data: [
      [step.midiPitch || '-', step.midiVelocity],
      ['pitch', 'velocity'],
      [`step: ${stepNumber}`]
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  return (selectedStep(state) ? stepDisplay : voiceDisplay)(state, ownProps)
}

export default connect(mapStateToProps)(LCDComponent)
