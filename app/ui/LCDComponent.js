'use strict'
import React from 'react'
import { connect } from 'react-redux'
import LCD from './LCD'
import { currentBpm, currentPattern, currentSample, currentSwing, currentTrack, currentVoice, sampleIds, sampleSelectionOn, sampleSelector, selectedStep, selectedTrackIndex } from '../selectors'
import NonLinearScale from '../utils/nonLinearScale'
import midiVelocityToAbsolute from '../voices/midiVelocityToAbsolute'
import { frequencyScaling } from '../player/actions'

const filterF = amount => Math.floor(frequencyScaling(amount))
const dbVolume = (midiVolume) => parseFloat(20 * Math.log10(midiVelocityToAbsolute(midiVolume))).toFixed(2) + 'dB'

const LCDComponent = (props) => <LCD {...props} />

const voiceDisplay = (state, ownProps) => {
  const trackIndex = selectedTrackIndex(state)
  const voice = currentVoice(state)
  const sample = currentSample(state)
  return {
    data: [
      [voice.pitch, sample.name, voice.decay, '', '', '', `${filterF(voice.filterAmount)} Hz`, dbVolume(voice.midiVolume)],
      ['pitch', 'sample', 'decay', '', '', '', 'filterF', 'volume'],
      sampleSelectionOn(state) ? sampleIdList(state, sample.id) : [],
      [`bpm:${currentBpm(state)}`, `swing:${currentSwing(state)}`, '', '', '', '', '', `voice: ${trackIndex}`]
    ]
  }
}

const sampleIdList = (state, currentSampleId) => {
  const ids = sampleIds(state)
  const sample = id => sampleSelector(state, id)
  return arrayRotate(ids, ids.indexOf(currentSampleId) - 1).slice(0,8).map(sample).map(s => s.name)
}

function arrayRotate(input, count) {
  let arr = input.slice()
  count -= arr.length * Math.floor(count / arr.length)
  arr.push.apply(arr, arr.splice(0, count))
  return arr
}

const stepDisplay = (state, ownProps) => {
  const track = currentTrack(state)
  const step = selectedStep(state)
  const stepNumber = track.stepIds.indexOf(step.id)
  return {
    data: [
      [step.midiPitch || '-', '', '', '', '', '', '', step.midiVelocity],
      ['pitch', '', '', '', '', '', '', 'velocity'],
      [],
      [`bpm:${currentBpm(state)}`, `swing:${currentSwing(state)}`, '', '', '', '', '', `step: ${stepNumber}`]
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  return (selectedStep(state) ? stepDisplay : voiceDisplay)(state, ownProps)
}

export default connect(mapStateToProps)(LCDComponent)
