'use strict'
import React from 'react'
import BlankRow from './ui/BlankRow'
import BlankGridButtonRow from './ui/BlankGridButtonRow'
import TransportControls from './TransportControls'
import PushControlModifiers from './PushControlModifiers'
import StepControl from './sequencer/StepControl'
import StepDelete from './sequencer/StepDelete'
import StepJumping from './sequencer/StepJumping'
import TrackControlComponent from './voices/TrackControlComponent'
import ChromaticKeyboard from './voices/ChromaticKeyboard'
import TrackVoiceControl from './voices/TrackVoiceControl'
import TrackSelectButton from './voices/TrackSelectButton'
import { connect } from 'react-redux'
import { currentPattern, patternIds, currentTrack } from './selectors'
import PatternSelect from './sequencer/PatternSelect'
import LCDComponent from './ui/LCDComponent'

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

const App = ({ patternIds, push, pushState, trackIds, recording, selectedStepId, selectedTrackId }) => {

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
      <div style={{display: 'table', borderSpacing: 3}} >
        <div style={gridStyle}>
          <TrackVoiceControl knobs={push.channelKnobs()} trackId={selectedTrackId} />
        </div>
        <LCDComponent pushLcdSegmentsRow={push.lcdSegmentsRow}/>
        <div style={gridStyle}>
          <BlankGridButtonRow />
          <div style={{display: 'table-row'}}>
            {trackIds.map((trackId, index) => (
              <TrackSelectButton
                key={index}
                button={push.gridSelectButtons()[index]}
                trackId={trackId}
              />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <PatternSelect
                key={i}
                patternId={patternIds[i]}
                button={push.gridSelectButtons()[i + 4]}
              />
            ))}
          </div>
        </div>
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

const mapStateToProps = (state, ownProps) => {
  const {push, sequencer: {recording, selectedStepId}} = state
  return {
    patternIds: patternIds(state),
    pushState: push,
    recording,
    selectedStepId,
    trackIds: currentPattern(state).trackIds,
    selectedTrackId: currentTrack(state).id
  }
}

export default connect(mapStateToProps)(App)
