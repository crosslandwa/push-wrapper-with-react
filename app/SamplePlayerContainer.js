'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from './DomGridPad'
import PushGridPad from './PushGridPad'
import { playSample } from './voices/actions'
import { recordStep } from './sequencer/actions'

const SamplePlayerContainer = ({ velocity = 0, playSample, pad }) => (
  <div>
    <DomGridPad
      padPressed={playSample}
      active={velocity > 0}
      className="pad"
    />
    <PushGridPad
      velocity={velocity}
      rgb = {[0, 10, 200]}
      pad={pad}
      padPressed={playSample}
    />
  </div>
)

export default connect(
  ({ voices }, { voice }) => {
    return { velocity: (voices[voice] && voices[voice].velocity) }
  },
  (dispatch, { voice }) => ({
    playSample (velocity = 100) {
      dispatch(playSample(voice, velocity))
      dispatch(recordStep(voice, velocity))
    }
  })
)(SamplePlayerContainer)
