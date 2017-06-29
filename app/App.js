'use strict'
import React from 'react'
import DomGridPad from './push/DomGridPad'
import GridSelectButtons from './ui/GridSelectButtons'
import { LeftSideControls, RightSideControls } from './ui/NonGridButtons'
import StepControl from './sequencer/StepControl'
import StepDelete from './sequencer/StepDelete'
import StepJumping from './sequencer/StepJumping'
import TrackControlComponent from './voices/TrackControlComponent'
import ChromaticKeyboard from './voices/ChromaticKeyboard'
import TrackVoiceControl from './voices/TrackVoiceControl'
import PatternSelectPads from './sequencer/PatternSelectPads'

import { connect } from 'react-redux'
import { currentPattern, patternIds, currentTrack, selectedStep } from './selectors'
import LCDComponent from './ui/LCDComponent'
import StepControlKnobs from './sequencer/StepControlKnobs'

const columnWidth = 56

const pushContainerStyle = {
  display: 'flex',
  backgroundColor: '#4a4a4a',
  borderStyle: 'solid',
  borderWidth: 2,
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 200px rgba(25, 25, 25, 1)',
  padding: 12,
  width: columnWidth * 14
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

  let StepControlComponent = StepControl
  if (pushState.modifiers.shift) {
    StepControlComponent = StepJumping
  } else if (pushState.modifiers.del) {
    StepControlComponent = StepDelete
  }

  return (
    <div style={pushContainerStyle} >
      <LeftSideControls push={push} />
      <div style={{width: 544}}>
        {isStepSelected
          ? <StepControlKnobs knobs={push.channelKnobs()} />
          : <TrackVoiceControl knobs={push.channelKnobs()} trackId={selectedTrackId} />
        }
        <LCDComponent pushLcdSegmentsRow={push.lcdSegmentsRow}/>
        <GridSelectButtons trackIds={trackIds} push={push}/>
        <div style={gridStyle}>
          {[...Array(8).keys()].map(index => (
            <TrackControlComponent
              key={index}
              recording={recording}
              del={pushState.modifiers.del}
              trackId={trackIds[index]}
              pad={push.gridRow(7)[index]}
            />
          ))}
          {[...Array(8).keys()].map(index => <DomGridPad key={index} />)}
          <ChromaticKeyboard
            basePitch={36}
            blackRow={push.gridRow(5)}
            recording={recording}
            whiteRow={push.gridRow(4)}
            trackId={selectedTrackId}
          />
          {pushState.modifiers.clip
            ? (
              <PatternSelectPads
                pads={[...push.gridRow(3), ...push.gridRow(2), ...push.gridRow(1), ...push.gridRow(0)]}
                patternIds={patternIds}
              />
            ) : (
              <StepControlComponent
                pads={[...push.gridRow(3), ...push.gridRow(2), ...push.gridRow(1), ...push.gridRow(0)]}
                trackId={selectedTrackId}
              />
            )
          }

        </div>
      </div>
      <RightSideControls push={push} />
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
