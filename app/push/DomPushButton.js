'use strict'
import React from 'react'
import Colours from './colours'

const padStyleBase = {
  display: 'inline-block',
  height: 32,
  lineHeight: '32px',
  textAlign: 'center',
  width: 64,
  marginLeft: 5,
  marginRight: 5,
  marginBottom: 5,
  backgroundColor: '#c7ccce',
  borderRadius: 10,
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

const DomPushButton = ({pad, active, padPressed, padReleased, rgb = Colours.orange, label = ''}) => (
  <div
    className='pad'
    onMouseDown={() => padPressed && padPressed()}
    onMouseUp={() => padReleased && padReleased()}
    style={Object.assign({},
      padStyleBase,
      active ? padStyleActive(rgb) : {}
    )}
  >
    {label}
  </div>
)

export default DomPushButton
