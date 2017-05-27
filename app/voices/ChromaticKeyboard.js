'use strict'
import React from 'react'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)

const ChromaticKeyboard = ({voice, basePitch, whiteRow}) => (
  <div>
    {[0, 2, 4, 5, 7, 9, 11, 12].map((offset, index) => (
      <ChromaticSamplePlayerContainer
        key={index}
        voice={voice}
        rate={midiNoteToF(offset + basePitch) / midiNoteToF(basePitch)}
        pad={whiteRow[index]}
      />
    ))}
  </div>
)

export default ChromaticKeyboard
