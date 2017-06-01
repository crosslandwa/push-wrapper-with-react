'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playSample } from './actions'
import VoiceSelectContainer from './VoiceSelectContainer'

const SamplePlayerContainer = (props) => <VoiceSelectContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { voiceId, padPressed }) => ({
    padPressed (velocity) {
      dispatch(playSample(voiceId, {velocity}))
      padPressed && padPressed(velocity)
    }
  })
)(SamplePlayerContainer)
