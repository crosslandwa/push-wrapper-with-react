'use strict'
import React from 'react'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PitchControl from './PitchControl'
import SampleSelect from './SampleSelect'
import BpmControlKnob from '../sequencer/BpmControlKnob'
import NumberOfStepsKnob from '../sequencer/NumberOfStepsKnob'
import DecayKnob from './DecayKnob'
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
      <BpmControlKnob>
        <PushKnob knob={knobs[2]} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </BpmControlKnob>
      <DecayKnob trackId={trackId} >
        <PushKnob knob={knobs[3]} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </DecayKnob>
      <NumberOfStepsKnob trackId={trackId} >
        <PushKnob knob={knobs[4]} />
        <ClickyDraggy><DomKnob /></ClickyDraggy>
      </NumberOfStepsKnob>
    </ChannelKnobs>
  )
}

export default TrackVoiceControl
