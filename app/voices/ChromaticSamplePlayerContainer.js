'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { playSample } from './actions'
import { recordStep } from '../sequencer/actions'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import Colours from '../push/colours'

const ChromaticSamplePlayerContainer = ({ velocity = 0, padPressed, pad, rgb = Colours.white }) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      active={true}
      rgb={rgb}
    />
    <PushGridPad
      velocity={127}
      rgb={rgb}
      pad={pad}
      padPressed={padPressed}
    />
  </div>
)

export default connect(
  state => ({}),
  (dispatch, { voice, rate }) => ({
    padPressed (velocity) {
      dispatch(playSample(voice, velocity, rate))
    }
  })
)(ChromaticSamplePlayerContainer)
