'use strict'
import React from 'react'
import { Colours } from './colours'

const style = {
  display: 'table-cell',
  backgroundColor: '#e16301',
  fontFamily: 'monospace',
  width: '12.5%',
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 10px rgba(25, 25, 25, 0.5)',
  padding: 4
}

const DomLcdSegment = ({text}) => <div style={style}>{text}</div>

export default DomLcdSegment
