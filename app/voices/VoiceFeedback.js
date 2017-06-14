'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomLcdSegment from '../push/DomLcdSegment'
import PushLcdSegment from '../push//PushLcdSegment'
import { currentSample, currentVoice } from '../selectors'

const VoiceFeedback = ({topRow, bottomRow, lcdSegmentsTopRow, lcdSegmentsBottomRow}) => (
  <div style={{display: 'table', width: '100%'}}>
    <div style={{display: 'table-row'}}>
      {topRow.map((data, index) => <DomLcdSegment key={index} text={data} /> )}
      {topRow.map((data, index) => <PushLcdSegment key={index} lcdSegment={lcdSegmentsTopRow[index]} text={data} /> )}
    </div>
    <div style={{display: 'table-row'}}>
      {bottomRow.map((data, index) => <DomLcdSegment key={index} text={data} /> )}
      {bottomRow.map((data, index) => <PushLcdSegment key={index} lcdSegment={lcdSegmentsBottomRow[index]} text={data} /> )}
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    topRow: [currentVoice(state).pitch, currentSample(state).name, '', '' , '', '', '', ''],
    bottomRow: ['pitch', 'sample', '', '' , '', '', '', '']
  }
}

export default connect(mapStateToProps)(VoiceFeedback)
