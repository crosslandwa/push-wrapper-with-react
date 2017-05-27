'use strict'
import React from 'react'
import DomGridPad from '../push/DomGridPad'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'
import Colours from '../push/colours'

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)

const ChromaticKeyboard = ({voice, basePitch, blackRow, whiteRow}) => (
  <div>
    <div>
      <DomGridPad key={0} />
      <ChromaticSamplePlayerContainer
        key={1}
        voice={voice}
        rate={midiNoteToF(1 + basePitch) / midiNoteToF(basePitch)}
        pad={blackRow[1]}
        rgb={Colours.black}
      />
      <ChromaticSamplePlayerContainer
        key={2}
        voice={voice}
        rate={midiNoteToF(3 + basePitch) / midiNoteToF(basePitch)}
        pad={blackRow[2]}
        rgb={Colours.black}
      />
      <DomGridPad key={3} />
      <ChromaticSamplePlayerContainer
        key={4}
        voice={voice}
        rate={midiNoteToF(6 + basePitch) / midiNoteToF(basePitch)}
        pad={blackRow[4]}
        rgb={Colours.black}
      />
      <ChromaticSamplePlayerContainer
        key={5}
        voice={voice}
        rate={midiNoteToF(8 + basePitch) / midiNoteToF(basePitch)}
        pad={blackRow[5]}
        rgb={Colours.black}
      />
      <ChromaticSamplePlayerContainer
        key={6}
        voice={voice}
        rate={midiNoteToF(10 + basePitch) / midiNoteToF(basePitch)}
        pad={blackRow[6]}
        rgb={Colours.black}
      />
      <DomGridPad key={7} />
    </div>
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
  </div>
)

export default ChromaticKeyboard
