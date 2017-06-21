'use strict'
import React from 'react'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PitchControl from './PitchControl'
import SampleSelect from './SampleSelect'
import ChannelKnobs from '../ui/ChannelKnobs'

const TrackVoiceControl = ({knobs, trackId}) => {
  return (
    <ChannelKnobs>
      <PitchControl trackId={trackId} >
        <PushKnob knob={knobs[0]} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </PitchControl>
      <SampleSelect trackId={trackId} >
        <PushKnob knob={knobs[1]} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </SampleSelect>
    </ChannelKnobs>
  )
}

export default TrackVoiceControl
