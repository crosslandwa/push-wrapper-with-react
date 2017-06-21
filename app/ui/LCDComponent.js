'use strict'
import React from 'react'
import { connect } from 'react-redux'
import LCD from './LCD'
import { currentPattern, currentSample, currentTrack, currentVoice  } from '../selectors'

const LCDComponent = (props) => <LCD {...props} />

const mapStateToProps = (state, ownProps) => {
  const trackIndex = currentPattern(state).trackIds.indexOf(currentTrack(state).id)
  return {
    data: [
      [currentVoice(state).pitch, currentSample(state).name],
      ['pitch', 'sample'],
      [`voice: ${trackIndex}`]
    ]
  }
}

export default connect(mapStateToProps)(LCDComponent)
