'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PitchControl from './PitchControl'
import SampleSelect from './SampleSelect'

const TrackVoiceControl = ({knobs, trackId}) => {
  return (
    <div>
      <PitchControl trackId={trackId} >
        <PushKnob knob={knobs[0]} />
        <ClickyDraggy>
          <DomKnob />
        </ClickyDraggy>
      </PitchControl>
      <SampleSelect trackId={trackId} >
        <PushKnob knob={knobs[1]} />
        <ClickyDraggy>
          <DomKnob />
        </ClickyDraggy>
      </SampleSelect>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps
)(TrackVoiceControl)
