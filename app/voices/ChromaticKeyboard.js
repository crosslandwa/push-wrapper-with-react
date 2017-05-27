'use strict'
import React from 'react'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'

const ChromaticKeyboard = ({voice, basePitch, whiteRow}) => (
  <div>
    {[0, 2, 4, 5, 7, 9, 11, 12].map((offset, index) => (
      <ChromaticSamplePlayerContainer
        key={index}
        voice={voice}
        midiPitch={basePitch + offset}
        pad={whiteRow[index]}
      />
    ))}
  </div>
)

export default ChromaticKeyboard
