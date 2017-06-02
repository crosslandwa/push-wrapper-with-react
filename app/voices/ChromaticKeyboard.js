'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import ChromaticStepEditorContainer from './ChromaticStepEditorContainer'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'
import ChromaticSampleRecorderContainer from './ChromaticSampleRecorderContainer'
import { Colours } from '../push/colours'

const ChromaticKeyboard = ({trackId, basePitch, blackRow, whiteRow, recording, selectedStepId, selectedStepPitch}) => {
  const Component = selectedStepId
    ? ChromaticStepEditorContainer
    : recording ? ChromaticSampleRecorderContainer : ChromaticSamplePlayerContainer
  return (
    <div>
      <div>
        {[0, 1, 3, 0, 6, 8, 10, 0].map((offset, index) => (
          offset
            ? <Component
              key={index}
              trackId={trackId}
              pitch={offset + basePitch}
              pad={blackRow[index]}
              rgb={(selectedStepPitch === (offset + basePitch)) ? Colours.orange : Colours.black}
              selectedStepId={selectedStepId}
              />
          : <DomGridPad key={index} />
        ))}
      </div>
      <div>
        {[0, 2, 4, 5, 7, 9, 11, 12].map((offset, index) => (
          <Component
            key={index}
            trackId={trackId}
            pitch={offset + basePitch}
            pad={whiteRow[index]}
            rgb={(selectedStepPitch === (offset + basePitch)) ? Colours.orange : Colours.white}
            selectedStepId={selectedStepId}
          />
        ))}
      </div>
    </div>
  )
}

export default connect(
  ({sequencer: {selectedStepId}, ui: { selectedTrackId }, entities: {steps, tracks, voices}}) => {
    const voiceId = tracks.byId[selectedTrackId].voiceId
    return {
      selectedStepPitch: (selectedStepId !== null) ? (steps.byId[selectedStepId].midiPitch || voices.byId[voiceId].pitch) : null
    }
  }
)(ChromaticKeyboard)
