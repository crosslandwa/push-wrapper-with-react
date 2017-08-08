'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChannelKnobs from '../ui/ChannelKnobs'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PushKnob from '../push/PushKnob'
import { updateSelectedVoicesDecay, updateSelectedVoicesFilterFrequency, updateSelectedVoicesPitch, updateSelectedVoicesVolume } from './actions'
import { switchSelectedVoicesSample } from './actions'
import { startSampleSelection, stopSampleSelection } from '../ui/actions'
import { modifiersDeleteSelector } from '../selectors'

const mergeProps = (state, { dispatch }, ownProps) => {
  return Object.assign({}, ownProps, bindActionCreators(ownProps.actions, dispatch))
}

const Knob = connect((state) => state, null, mergeProps)((props) => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
))

const TrackVoiceControl = ({knobs}) => {
  return (
    <ChannelKnobs>
      <Knob knob={knobs[0]} actions={{ onTurned: updateSelectedVoicesPitch }} />
      <Knob knob={knobs[1]} actions={{ onTurned: switchSelectedVoicesSample, onPressed: startSampleSelection, onReleased: stopSampleSelection }}/>
      <Knob knob={knobs[2]} actions={{ onTurned: updateSelectedVoicesDecay }} />
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <Knob knob={knobs[6]} actions={{ onTurned: updateSelectedVoicesFilterFrequency }} />
      <Knob knob={knobs[7]} actions={{ onTurned: updateSelectedVoicesVolume }} />
    </ChannelKnobs>
  )
}

export default TrackVoiceControl
