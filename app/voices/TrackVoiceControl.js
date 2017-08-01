'use strict'
import React from 'react'
import PitchControl from './PitchControl'
import SampleSelect from './SampleSelect'
import DecayKnob from './DecayKnob'
import ChannelKnobs from '../ui/ChannelKnobs'
import FilterFrequencyControl from './FilterFrequencyControl'
import VolumeControl from './VolumeControl'
import DomKnob from '../push/DomKnob'

const TrackVoiceControl = ({knobs, trackId, trackIds}) => {
  return (
    <ChannelKnobs>
      <PitchControl knob={knobs[0]} />
      <SampleSelect trackId={trackId} knob={knobs[1]} />
      <DecayKnob knob={knobs[2]} />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <FilterFrequencyControl knob={knobs[6]} />
      <VolumeControl knob={knobs[7]} />
    </ChannelKnobs>
  )
}

export default TrackVoiceControl
