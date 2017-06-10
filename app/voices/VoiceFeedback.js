'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomLcdSegment from '../push/DomLcdSegment'

const VoiceFeedback = ({selectedVoicePitch}) => {
  return (
    <div style={{display: 'table', width: '100%'}}>
      <div style={{display: 'table-row'}}>
        <DomLcdSegment text={selectedVoicePitch} />
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
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
        <DomLcdSegment/>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { entities: { tracks, voices }, ui: { selectedTrackId } } = state
  return {
    selectedVoicePitch: voices.byId[tracks.byId[selectedTrackId].voiceId].pitch
  }
}

export default connect(mapStateToProps)(VoiceFeedback)
