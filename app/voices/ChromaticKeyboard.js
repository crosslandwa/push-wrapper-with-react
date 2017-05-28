'use strict'
import React from 'react'
import DomGridPad from '../push/DomGridPad'
import ChromaticSamplePlayerContainer from './ChromaticSamplePlayerContainer'
import Colours from '../push/colours'

const ChromaticKeyboard = ({voice, basePitch, blackRow, whiteRow}) => (
  <div>
    <div>
      {[0, 1, 3, 0, 6, 8, 10, 0].map((offset, index) => (
        offset
          ? <ChromaticSamplePlayerContainer
            key={index}
            voice={voice}
            pitch={offset + basePitch}
            pad={blackRow[1]}
            rgb={Colours.black}
            />
        : <DomGridPad key={index} />
      ))}
    </div>
    <div>
      {[0, 2, 4, 5, 7, 9, 11, 12].map((offset, index) => (
        <ChromaticSamplePlayerContainer
          key={index}
          voice={voice}
          pitch={offset + basePitch}
          pad={whiteRow[index]}
        />
      ))}
    </div>
  </div>
)

export default ChromaticKeyboard
