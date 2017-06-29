'use strict'
import React from 'react'
import { connect } from 'react-redux'
import LCD from './LCD'
import { currentBpm, currentPattern, currentSample, currentTrack, currentVoice, selectedStep, selectedTrackIndex } from '../selectors'

const LCDComponent = (props) => <LCD {...props} />

const voiceDisplay = (state, ownProps) => {
  const track = currentTrack(state)
  const trackIndex = selectedTrackIndex(state)
  const voice = currentVoice(state)
  return {
    data: [
      [voice.pitch, currentSample(state).name, voice.decay, track.numberOfSteps],
      ['pitch', 'sample', 'decay', 'length'],
      ['bpm', 'swing', '', '', '', '', '', `voice: ${trackIndex}`],
      [currentBpm(state), 0]
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
      ['bpm', 'swing', '', '', '', '', '', `step: ${stepNumber}`],
      [currentBpm(state), 0]
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  return (selectedStep(state) ? stepDisplay : voiceDisplay)(state, ownProps)
}

export default connect(mapStateToProps)(LCDComponent)
