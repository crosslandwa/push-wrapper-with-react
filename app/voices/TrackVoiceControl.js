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
      <PitchControl trackId={trackId} knob={knobs[0]} />
      <SampleSelect trackId={trackId} knob={knobs[1]} />
      <DecayKnob trackId={trackId} knob={knobs[2]} />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <FilterFrequencyControl trackIds={trackIds} knob={knobs[6]} />
      <VolumeControl trackId={trackId} knob={knobs[7]} />
    </ChannelKnobs>
  )
}

export default TrackVoiceControl
