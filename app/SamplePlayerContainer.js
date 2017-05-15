'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridPad from './DomGridPad'
import PushGridPad from './PushGridPad'
import { playSample } from './voices/actions'
import { recordStep, deleteModeOff, deleteModeOn } from './sequencer/actions'

const SamplePlayerContainer = ({ velocity = 0, padPressed, padReleased, pad, rgb }) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      padReleased={padReleased}
      active={velocity > 0}
      className="pad"
      rgb={rgb}
    />
    <PushGridPad
      velocity={velocity}
      rgb = {rgb}
      pad={pad}
      padPressed={padPressed}
      padReleased={padReleased}
    />
  </div>
)

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { del, deleteMode, velocity } = stateProps
  const { dispatch } = dispatchProps
  const { voice } = ownProps

  const padActions = del
    ? {
      padPressed: () => {},
      padReleased: () => console.log('asdsada')
    }
    : {
      padPressed: (velocity = 100) => {
        dispatch(playSample(voice, velocity))
        dispatch(recordStep(voice, velocity))
      },
      padReleased: () => {}
    }

  if (!del && deleteMode) dispatch(deleteModeOff(voice))

  return Object.assign({},
    ownProps,
    {
      rgb: del ? [200, 100, 0] : [0, 100, 200],
      velocity: del ? (deleteMode ? 100 : 0) : velocity
    },
    padActions,
  )
}

export default connect(
  (
    { voices, push: { modifiers: { del } }, sequencer: { voices: seqVoices } },
    { voice }
  ) => {
    return {
      velocity: (voices[voice] && voices[voice].velocity),
      del,
      deleteMode: seqVoices[voice] && seqVoices[voice].deleteMode
    }
  },
  null,
  mergeProps
)(SamplePlayerContainer)
