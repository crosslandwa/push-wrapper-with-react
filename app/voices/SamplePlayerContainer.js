'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playSample } from './actions'
import VoiceSelectContainer from './VoiceSelectContainer'

const SamplePlayerContainer = (props) => <VoiceSelectContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice, pitch, padPressed }) => ({
    padPressed (velocity) {
      dispatch(playSample(voice, pitch, velocity))
      padPressed && padPressed(velocity)
    }
  })
)(SamplePlayerContainer)
