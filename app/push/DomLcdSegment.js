'use strict'
import React from 'react'
import { Colours } from './colours'

const style = {
  textAlign: 'center',
  fontFamily: 'monospace',
  width: '12%',
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 10px rgba(25, 25, 25, 0.5)',
  fontSize: '11px',
  lineHeight: '2em',
  height: '2em'
}

const DomLcdSegment = ({text}) => <div style={style}>{text}</div>

export default DomLcdSegment
