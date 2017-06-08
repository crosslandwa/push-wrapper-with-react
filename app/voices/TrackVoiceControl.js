'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import PitchControl from './PitchControl'

const TrackVoiceControl = ({knobs, trackId}) => {
  return (
    <div>
      <PitchControl trackId={trackId} >
        <PushKnob knob={knobs[0]} />
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
