'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChannelKnobs from '../ui/ChannelKnobs'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PushKnob from '../push/PushKnob'
import { resetPitch, updatePitch } from './actions'
import { updateDecay, updateFilterFrequency, updateVolume } from './actions'
import { switchSample } from './actions'
import { startSampleSelection, stopSampleSelection } from '../ui/actions'
import { modifiersDeleteSelector } from '../selectors'

const mergeProps = (state, { dispatch }, ownProps) => {
  const actions = Object.assign(
    {},
    modifiersDeleteSelector(state) ? ownProps.resetActions || {} : ownProps.actions
  )
  return Object.assign({}, ownProps, bindActionCreators(actions, dispatch))
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
      <Knob knob={knobs[0]} actions={{ onTurned: updatePitch }} resetActions={{ onTurned: resetPitch }} />
      <Knob knob={knobs[1]} actions={{ onTurned: switchSample, onPressed: startSampleSelection, onReleased: stopSampleSelection }}/>
      <Knob knob={knobs[2]} actions={{ onTurned: updateDecay }}/>
      <DomKnob />
      <DomKnob />
      <DomKnob />
      <Knob knob={knobs[6]} actions={{ onTurned: updateFilterFrequency }}/>
      <Knob knob={knobs[7]} actions={{ onTurned: updateVolume }}/>
    </ChannelKnobs>
  )
}

export default TrackVoiceControl
