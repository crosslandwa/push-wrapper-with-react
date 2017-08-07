'use strict'
import React from 'react'
import { connect } from 'react-redux'
import LCD from './LCD'
import { currentBpm, currentPattern, currentSample, currentSwing, currentVoice, sampleIds, sampleSelectionOn, sampleSelector, selectedSteps, selectedTrackIndex } from '../selectors'
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
  const steps = selectedSteps(state)
  const step = steps[0]
  return {
    data: [
      [step.midiPitch || '-', '', step.voiceDecay || '-', '', '', '', '', step.midiVelocity],
      ['pitch', '', 'decay', '', '', '', '', 'velocity'],
      [],
      [`bpm:${currentBpm(state)}`, `swing:${currentSwing(state)}`, '', '', '', '', '', `steps: ${steps.length}`]
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  return (selectedSteps(state).length > 0 ? stepDisplay : voiceDisplay)(state, ownProps)
}

export default connect(mapStateToProps)(LCDComponent)
