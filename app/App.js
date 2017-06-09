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

const columnWidth = 56

const pushContainerStyle = {
  display: 'table',
  backgroundColor: '#4a4a4a',
  borderStyle: 'solid',
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 200px rgba(25, 25, 25, 1)',
  padding: 12
}

const lhButtonsStyle = {
  display: 'table-cell',
  width: columnWidth * 2,
  verticalAlign: 'bottom'
}

const rhButtonsStyle = {
  display: 'table-cell',
  width: columnWidth * 3,
  verticalAlign: 'bottom'
}

const gridStyle = {
  display: 'table-cell',
  width: columnWidth * 10,
  verticalAlign: 'top'
}

const lcdStyle = {
  display: 'table-cell',
  height: 100,
  backgroundColor: '#e16301',
  borderStyle: 'solid',
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 20px rgba(25, 25, 25, 1)',
}

const buttonColumnStyle = {
  display: 'inline-block',
  width: columnWidth,
  verticalAlign: 'bottom'
}

const App = ({ push, pushState, trackIds, recording, selectedStepId, selectedTrackId, selectedVoicePitch }) => {

  let StepControlComponent = StepControl
  if (pushState.modifiers.shift) {
    StepControlComponent = StepJumping
  } else if (pushState.modifiers.del) {
    StepControlComponent = StepDelete
  }

  return (
    <div style={pushContainerStyle} >
      <div style={lhButtonsStyle}>
        <div style={buttonColumnStyle}>
          <PushControlModifiers push={push} />
          <TransportControls push={push} />
        </div>
        <div style={buttonColumnStyle} />
      </div>
      <div style={{display: 'table', borderSpacing: 6}} >
        <div style={{display: 'table-row'}} >
        <TrackVoiceControl style={{display: 'table-cell'}} knobs={push.channelKnobs()} trackId={selectedTrackId} />
        </div>
        <div style={{display: 'table-row'}} >
          <div style={lcdStyle} >
            {selectedVoicePitch}
          </div>
        </div>
        <div style={gridStyle}>
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
      </div>
      <div style={rhButtonsStyle} >
        <div style={buttonColumnStyle} />
        <div style={buttonColumnStyle} />
        <div style={buttonColumnStyle} />
      </div>
    </div>
  )
}

export default connect(
  ({push, entities: {patterns, steps, tracks, voices}, sequencer: {patternId, recording, selectedStepId}, ui: {selectedTrackId}}) => ({
    pushState: push,
    recording,
    selectedStepId,
    trackIds: patterns.byId[patternId].trackIds,
    selectedTrackId,
    selectedVoicePitch: voices.byId[tracks.byId[selectedTrackId].voiceId].pitch
  })
)(App)
