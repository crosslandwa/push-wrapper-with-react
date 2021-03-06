'use strict'
import React from 'react'
import DomGridPad from './push/DomGridPad'
import GridSelectButtons from './ui/GridSelectButtons'
import { LeftSideControls, RightSideControls } from './ui/NonGridButtons'
import StepControl from './sequencer/StepControl'
import StepJumping from './sequencer/StepJumping'
import TrackControlComponent from './voices/TrackControlComponent'
import ChromaticKeyboard from './voices/ChromaticKeyboard'
import TrackVoiceControl from './voices/TrackVoiceControl'
import PatternSelectPads from './sequencer/PatternSelectPads'
import PatternLengthPads from './sequencer/PatternLengthPads'
import TrackMute from './sequencer/TrackMute'
import SamplePlayer from './player/SamplePlayer'

import { connect } from 'react-redux'
import { currentPattern, isRecording, patternIds, currentTrack, selectedSteps } from './selectors'
import LCDComponent from './ui/LCDComponent'
import StepControlKnobs from './sequencer/StepControlKnobs'

const pushContainerStyle = {
  display: 'flex',
  backgroundColor: '#4a4a4a',
  borderStyle: 'solid',
  borderWidth: 2,
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 200px rgba(25, 25, 25, 1)',
  fontFamily: 'sans-serif',
  padding: '12px 6px',
  width: 770
}

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'transparent'
}

const App = ({ patternIds, push, pushState, trackIds, recording, isStepSelected, selectedTrackId }) => {

  const bottomPads = [...push.gridRow(3), ...push.gridRow(2), ...push.gridRow(1), ...push.gridRow(0)]
  let bottomPadsComponent
  if (pushState.modifiers.fixedLength) {
    bottomPadsComponent = <PatternLengthPads pads={bottomPads} trackId={selectedTrackId}/>
  } else if (pushState.modifiers.clip) {
    bottomPadsComponent = <PatternSelectPads pads={bottomPads} patternIds={patternIds} />
  } else if (pushState.modifiers.shift) {
    bottomPadsComponent = <StepJumping pads={bottomPads} trackId={selectedTrackId} />
  } else {
    bottomPadsComponent = <StepControl pads={bottomPads} trackId={selectedTrackId} />
  }
  return (
    <div style={pushContainerStyle} >
      <LeftSideControls push={push} />
      <div style={{width: 544}}>
        {isStepSelected
          ? <StepControlKnobs knobs={push.channelKnobs()} />
          : <TrackVoiceControl knobs={push.channelKnobs()} />
        }
        <LCDComponent pushLcdSegmentsRow={push.lcdSegmentsRow}/>
        <GridSelectButtons deleteModifier={pushState.modifiers.delete} isStepSelected={isStepSelected} trackIds={trackIds} push={push}/>
        <div style={gridStyle}>
          {[...Array(8).keys()].map(index => (
            <TrackControlComponent
              key={index}
              recording={recording}
              del={pushState.modifiers.delete}
              trackId={trackIds[index]}
              pad={push.gridRow(7)[index]}
            />
          ))}
          {trackIds.map((trackId, index) => <TrackMute key={trackId} trackId={trackId} pad={push.gridRow(6)[index]} />)}
          <ChromaticKeyboard
            basePitch={36}
            blackRow={push.gridRow(5)}
            recording={recording}
            whiteRow={push.gridRow(4)}
            trackId={selectedTrackId}
          />
          {bottomPadsComponent}
        </div>
      </div>
      <RightSideControls push={push} />
      <div>
        {trackIds.map((trackId, index) => <SamplePlayer key={trackId} trackId={trackId} />)}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {push} = state
  return {
    patternIds: patternIds(state),
    pushState: push,
    recording: isRecording(state),
    trackIds: currentPattern(state).trackIds,
    isStepSelected: selectedSteps(state).length > 0,
    selectedTrackId: currentTrack(state).id
  }
}

export default connect(mapStateToProps)(App)
