'use strict'
import React from 'react'
import PitchControl from './PitchControl'
import SampleSelect from './SampleSelect'
import NumberOfStepsKnob from '../sequencer/NumberOfStepsKnob'
import DecayKnob from './DecayKnob'
import ChannelKnobs from '../ui/ChannelKnobs'
import FilterFrequencyControl from './FilterFrequencyControl'
import VolumeControl from './VolumeControl'

const TrackVoiceControl = ({knobs, trackId}) => {
  return (
    <ChannelKnobs>
      <PitchControl trackId={trackId} knob={knobs[0]} />
      <SampleSelect trackId={trackId} knob={knobs[1]} />
      <DecayKnob trackId={trackId} knob={knobs[2]} />
      <NumberOfStepsKnob trackId={trackId} knob={knobs[3]} />
      <FilterFrequencyControl trackId={trackId} knob={knobs[4]} />
      <VolumeControl trackId={trackId} knob={knobs[5]} />
    </ChannelKnobs>
  )
}

export default TrackVoiceControl
