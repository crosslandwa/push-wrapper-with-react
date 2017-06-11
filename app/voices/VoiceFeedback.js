'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomLcdSegment from '../push/DomLcdSegment'
import PushLcdSegment from '../push//PushLcdSegment'

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
  const { entities: { samples, tracks, voices }, ui: { selectedTrackId } } = state
  const voiceId = tracks.byId[selectedTrackId].voiceId
  const sampleId = voices.byId[voiceId].sampleId
  const selectedVoicePitch = voices.byId[voiceId].pitch
  return {
    topRow: [selectedVoicePitch, samples.byId[sampleId].name, '', '' , '', '', '', ''],
    bottomRow: ['pitch', 'sample', '', '' , '', '', '', '']
  }
}

export default connect(mapStateToProps)(VoiceFeedback)
