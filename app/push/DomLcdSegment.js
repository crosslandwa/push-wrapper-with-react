'use strict'
import React from 'react'
import { Colours } from './colours'

const style = {
  display: 'table-cell',
  textAlign: 'center',
  verticalAlign: 'middle',
  fontFamily: 'monospace',
  width: '12.5%',
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 10px rgba(25, 25, 25, 0.5)',
  fontSize: '11px',
  height: '1.75em'
}

const DomLcdSegment = ({text}) => <div style={style}>{text}</div>

export default DomLcdSegment
