'use strict'
import React from 'react'
import { Colours } from './colours'

const padStyleBase = {
  display: 'inline-block',
  height: 48,
  width: 60,
  marginTop: 4,
  backgroundColor: '#c7ccce', // 199, 204, 206
  borderRadius: 10,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer'
}

const padStyleActive = (rgb) => ({
  boxShadow: `inset 0px 0px 50px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
  borderColor: `rgba(100, 100, 100, 0.6)`
})

const DomGridPad = ({children, pad, active = false, padPressed, padReleased, rgb = Colours.blue}) => (
  <div
    onMouseDown={() => padPressed && padPressed(100)}
    onMouseUp={() => padReleased && padReleased()}
    style={{
      ...padStyleBase,
      ...(active ? padStyleActive(rgb) : {})
    }}
  >
    {children}
  </div>
)

export default DomGridPad
