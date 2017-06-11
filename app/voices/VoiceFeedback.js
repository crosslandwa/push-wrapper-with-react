'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomLcdSegment from '../push/DomLcdSegment'
import PushLcdSegment from '../push//PushLcdSegment'

const VoiceFeedback = ({sampleName, selectedVoicePitch, lcdSegmentsTopRow, lcdSegmentsBottomRow}) => {
  return (
    <div style={{display: 'table', width: '100%'}}>
      <div style={{display: 'table-row'}}>
        <DomLcdSegment text={selectedVoicePitch} />
        <PushLcdSegment lcdSegment={lcdSegmentsTopRow[0]} text={selectedVoicePitch} />
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
      </div>
      <div style={{display: 'table-row'}}>
        <DomLcdSegment text='pitch' />
        <PushLcdSegment lcdSegment={lcdSegmentsBottomRow[0]} text='pitch' />
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment text='voice: ' />
        <PushLcdSegment lcdSegment={lcdSegmentsBottomRow[6]} text='voice:' />
        <DomLcdSegment text={sampleName} />
        <PushLcdSegment lcdSegment={lcdSegmentsBottomRow[7]} text={sampleName} />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { entities: { samples, tracks, voices }, ui: { selectedTrackId } } = state
  const voiceId = tracks.byId[selectedTrackId].voiceId
  const sampleId = voices.byId[voiceId].sampleId
  return {
    selectedVoicePitch: voices.byId[voiceId].pitch,
    sampleName: samples.byId[sampleId].name
  }
}

export default connect(mapStateToProps)(VoiceFeedback)
