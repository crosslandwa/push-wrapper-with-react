'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from '../push/DomGridPad'
import ChromaticStepEditorContainer from './ChromaticStepEditorContainer'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'
import ChromaticSampleRecorderContainer from './ChromaticSampleRecorderContainer'
import { Colours } from '../push/colours'
import { currentVoice, selectedSteps } from '../selectors'

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap'
}

const ChromaticKeyboard = ({trackId, basePitch, blackRow, whiteRow, recording, isStepSelected, selectedStepPitch}) => {
  const Component = isStepSelected
    ? ChromaticStepEditorContainer
    : recording ? ChromaticSampleRecorderContainer : ChromaticSamplePlayerContainer
  return (
    <div style={style} >
      {[0, 1, 3, 0, 6, 8, 10, 0].map((offset, index) => offset
        ? (
          <Component
            key={index}
            trackId={trackId}
            pitch={offset + basePitch}
            pad={blackRow[index]}
            rgb={(selectedStepPitch === (offset + basePitch)) ? Colours.orange : Colours.black}
          />
        )
        : <DomGridPad key={index} />
      )}
      {[0, 2, 4, 5, 7, 9, 11, 12].map((offset, index) => (
        <Component
          key={index}
          trackId={trackId}
          pitch={offset + basePitch}
          pad={whiteRow[index]}
          rgb={(selectedStepPitch === (offset + basePitch)) ? Colours.orange : Colours.white}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const voice = currentVoice(state)
  const steps = selectedSteps(state)
  const isStepSelected = steps.length > 0
  return {
    isStepSelected,
    selectedStepPitch: isStepSelected ? (steps[0].midiPitch || voice.pitch) : null
  }
}

export default connect(mapStateToProps)(ChromaticKeyboard)
