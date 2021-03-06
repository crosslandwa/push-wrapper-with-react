'use strict'
import React from 'react'
import { Colours } from './colours'

const padStyleBase = {
  height: 24,
  // textAlign: 'center',
  fontSize: 10,
  width: 48,
  marginLeft: 2,
  marginRight: 2,
  marginBottom: 2,
  backgroundColor: '#c7ccce',
  borderRadius: 4,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: 2
}

const padStyleActive = (rgb) => ({
  opacity: 0.9,
  boxShadow: `inset 0px 0px 50px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
  borderColor: 'rgba(100, 100, 100, 0.3)'
})

const DomButton = ({active, children, doubleHeight, padPressed, padReleased, rgb = Colours.orange, label = ''}) => (
  <div
    onMouseDown={() => padPressed && padPressed()}
    onMouseUp={() => padReleased && padReleased()}
    style={Object.assign({},
      padStyleBase,
      active ? padStyleActive(rgb) : {},
      doubleHeight ? { height: 48 } : {}
    )}
  >
    {label}
    {children}
  </div>
)

export default DomButton
