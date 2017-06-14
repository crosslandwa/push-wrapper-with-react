'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomLcdSegment from '../push/DomLcdSegment'
import PushLcdSegment from '../push//PushLcdSegment'
import { currentPattern, currentTrack } from '../selectors'

const StatusFeedback = ({topRow, bottomRow, lcdSegmentsTopRow, lcdSegmentsBottomRow}) => {
  return (
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
}

const mapStateToProps = (state, ownProps) => {
  const trackIndex = currentPattern(state).trackIds.indexOf(currentTrack(state).id)
  return {
    topRow: [`voice: ${trackIndex}`, '', '', '', '', '', '', ''],
    bottomRow: ['', '', '', '', '', '', '', '']
  }
}

export default connect(mapStateToProps)(StatusFeedback)
