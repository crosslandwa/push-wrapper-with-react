'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from './DomGridPad'
import { playSample } from './actions'

const SamplePlayerContainer = ({ velocity = 0, playSample }) => (
  <DomGridPad
    padPressed={playSample}
    active={velocity > 0}
    className="pad"
  />
)

export default connect(
  ({ samples }, { sampleKey: key }) => {
    return { velocity: (samples[key] && samples[key].velocity) || 0 }
  },
  (dispatch, { sampleKey: key }) => ({
    playSample () {
      dispatch(playSample(key, 100))
    }
  })
)(SamplePlayerContainer)
