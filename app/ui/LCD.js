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
  backgroundColor: '#e16301',
  borderStyle: 'solid',
  borderWidth: 2,
  borderRadius: 4,
  boxShadow: 'inset 0px 0px 20px rgba(25, 25, 25, 1)'
}

class LCDStrip extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
        {paddedRow(this.props.data).map((text, index) => (
          <DomLcdSegment key={index} text={text} />
        ))}
        {paddedRow(this.props.data).map((text, index) => (
          <PushLcdSegment
            key={index}
            lcdSegment={this.props.pushLcdSegmentsRow[index]}
            text={text}
          />
        ))}
      </div>
    )
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data.toString() !== nextProps.data.toString()
  }
}

const LCD = ({data = [], pushLcdSegmentsRow}) => (
  <div style={style}>
    {paddedRows(data).map((row, index) => (
      <LCDStrip key={index} data={row} rowIndex={index} pushLcdSegmentsRow={pushLcdSegmentsRow(3 - index)} />
    ))}
  </div>
)

export default LCD
