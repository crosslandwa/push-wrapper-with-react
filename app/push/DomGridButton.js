'use strict'
import React from 'react'
import { Colours } from './colours'

const padStyleBase = {
  height: 24,
  lineHeight: '24px',
  textAlign: 'center',
  width: 60,
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#c7ccce',
  borderRadius: 4,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer'
}

const padStyleActive = (rgb) => ({
  opacity: 0.9,
  boxShadow: `inset 0px 0px 50px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
  borderColor: `rgba(100, 100, 100, 0.3)`
})

const DomGridButton = ({active, onPressed, onReleased, rgb = Colours.orange}) => (
  <div
    onMouseDown={() => onPressed && onPressed()}
    onMouseUp={() => onReleased && onReleased()}
    style={Object.assign({},
      padStyleBase,
      active ? padStyleActive(rgb) : {}
    )}
  />
)

export default DomGridButton
