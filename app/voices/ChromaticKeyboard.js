'use strict'
import React from 'react'
import DomGridPad from '../push/DomGridPad'
import ChromaticStepEditorContainer from './ChromaticStepEditorContainer'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'
import ChromaticSampleRecorderContainer from './ChromaticSampleRecorderContainer'
import { Colours } from '../push/colours'

const ChromaticKeyboard = ({voice, basePitch, blackRow, whiteRow, recording, selectedStepId}) => {
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
              voice={voice}
              pitch={offset + basePitch}
              pad={blackRow[index]}
              rgb={Colours.black}
              selectedStepId={selectedStepId}
              />
          : <DomGridPad key={index} />
        ))}
      </div>
      <div>
        {[0, 2, 4, 5, 7, 9, 11, 12].map((offset, index) => (
          <Component
            key={index}
            voice={voice}
            pitch={offset + basePitch}
            pad={whiteRow[index]}
            selectedStepId={selectedStepId}
          />
        ))}
      </div>
    </div>
  )
}

export default ChromaticKeyboard
