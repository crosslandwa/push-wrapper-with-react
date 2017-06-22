'use strict'
import React from 'react'
import BlankRow from './ui/BlankRow'
import GridSelectButtons from './ui/GridSelectButtons'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'
import StepControl from './sequencer/StepControl'
import StepDelete from './sequencer/StepDelete'
import StepJumping from './sequencer/StepJumping'
import TrackControlComponent from './voices/TrackControlComponent'
import ChromaticKeyboard from './voices/ChromaticKeyboard'
import TrackVoiceControl from './voices/TrackVoiceControl'

import { connect } from 'react-redux'
import { currentPattern, patternIds, currentTrack, selectedStep } from './selectors'
import LCDComponent from './ui/LCDComponent'
import StepControlKnobs from './sequencer/StepControlKnobs'

const columnWidth = 56

const pushContainerStyle = {
  display: 'table',
  backgroundColor: '#4a4a4a',
  borderStyle: 'solid',
  borderWidth: 2,
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
  display: 'table',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'transparent'
}

const buttonColumnStyle = {
  display: 'inline-block',
  width: columnWidth,
  verticalAlign: 'bottom'
}

const App = ({ patternIds, push, pushState, trackIds, recording, isStepSelected, selectedTrackId }) => {

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
      <div>
        <div style={gridStyle}>
          {isStepSelected
            ? <StepControlKnobs knobs={push.channelKnobs()} />
            : <TrackVoiceControl knobs={push.channelKnobs()} trackId={selectedTrackId} />
          }
        </div>
        <LCDComponent pushLcdSegmentsRow={push.lcdSegmentsRow}/>
        <GridSelectButtons trackIds={trackIds} patternIds={patternIds} push={push}/>
        <div style={gridStyle}>
          {trackIds.map((trackId, index) => (
            <TrackControlComponent
              key={index}
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

const mapStateToProps = (state, ownProps) => {
  const {push, sequencer: {recording}} = state
  return {
    patternIds: patternIds(state),
    pushState: push,
    recording,
    trackIds: currentPattern(state).trackIds,
    isStepSelected: !!selectedStep(state),
    selectedTrackId: currentTrack(state).id
  }
}

export default connect(mapStateToProps)(App)
