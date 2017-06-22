'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomLcdSegment from '../push/DomLcdSegment'
import PushLcdSegment from '../push//PushLcdSegment'
const emptyRows = [[], [], [], []]
const emptyRow = ['', '', '', '', '', '', '', '']
const paddedRows = rows => rows.concat(emptyRows).slice(0, 4)
const paddedRow = row => row.concat(emptyRow).slice(0, 8)

const style = {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  backgroundColor: '#e16301',
  borderStyle: 'solid',
  borderWidth: 2,
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 20px rgba(25, 25, 25, 1)'
}

const LCD = ({data = [], pushLcdSegmentsRow}) => (
  <div style={style}>
    {paddedRows(data).map((row, rowIndex) => paddedRow(row).map((text, colIndex) => (
      <DomLcdSegment key={colIndex} text={text} />
    )))}
    {paddedRows(data).map((row, rowIndex) => paddedRow(row).map((text, colIndex) => (
      <PushLcdSegment
        key={colIndex}
        lcdSegment={pushLcdSegmentsRow(3 - rowIndex)[colIndex]}
        text={text}
      />
    )))}
  </div>
)

export default LCD
