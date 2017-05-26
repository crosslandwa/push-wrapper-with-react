'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playSample } from './actions'
import { recordStep } from '../sequencer/actions'
import VoiceSelectContainer from './VoiceSelectContainer'

const SamplePlayerContainer = (props) => <VoiceSelectContainer {...props} />

export default connect(
  state => ({}),
  (dispatch, { voice }) => ({
    padPressed (velocity) {
      dispatch(playSample(voice, velocity))
      dispatch(recordStep(voice, velocity))
    }
  })
)(SamplePlayerContainer)
