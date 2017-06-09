'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import PitchControl from './PitchControl'

const TrackVoiceControl = ({knobs, trackId}) => {
  return (
    <div>
      <PitchControl trackId={trackId} >
        <PushKnob knob={knobs[0]} />
        <ClickyDraggy>
          <DomKnob />
        </ClickyDraggy>
      </PitchControl>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps
)(TrackVoiceControl)
