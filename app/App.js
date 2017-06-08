'use strict'
import React from 'react'
import BlankRow from './ui/BlankRow'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'
import StepControl from './sequencer/StepControl'
import StepDelete from './sequencer/StepDelete'
import StepJumping from './sequencer/StepJumping'
import TrackControlComponent from './voices/TrackControlComponent'
import ChromaticKeyboard from './voices/ChromaticKeyboard'
import TrackVoiceControl from './voices/TrackVoiceControl'
import { connect } from 'react-redux'

const App = ({ push, pushState, trackIds, recording, selectedStepId, selectedTrackId }) => {

  let StepControlComponent = StepControl
  if (pushState.modifiers.shift) {
    StepControlComponent = StepJumping
  } else if (pushState.modifiers.del) {
    StepControlComponent = StepDelete
  }

  return (
    <div>
      <PushControlModifiers push={push} />
      <TransportControls push={push} />
      <TrackVoiceControl knobs={push.channelKnobs()} trackId={selectedTrackId} />
      {trackIds.map((trackId, index) => (
        <TrackControlComponent
          key={index}
          shift={pushState.modifiers.shift}
          recording={recording}
          del={pushState.modifiers.del}
          trackId={trackId}
          pad={push.gridRow(7)[index]}
        />
      ))}
      <BlankRow />
      <ChromaticKeyboard
        basePitch={36}
        blackRow={push.gridRow(5)}
        recording={recording}
        whiteRow={push.gridRow(4)}
        trackId={selectedTrackId}
        selectedStepId={selectedStepId}
      />
      <StepControlComponent
        pads={[...push.gridRow(3), ...push.gridRow(2), ...push.gridRow(1), ...push.gridRow(0)]}
        trackId={selectedTrackId}
      />
    </div>
  )
}

export default connect(
  ({push, entities: {patterns, steps, tracks}, sequencer: {patternId, recording, selectedStepId}, ui: {selectedTrackId}}) => ({
    pushState: push,
    recording,
    selectedStepId,
    trackIds: patterns.byId[patternId].trackIds,
    selectedTrackId
  })
)(App)
