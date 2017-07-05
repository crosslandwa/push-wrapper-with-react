'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { changeNumberOfStepsTo } from './actions'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'
import { trackSelector } from '../selectors'

const PatternLengthPad = props => {
  const {length, numberOfSteps, pad, padPressed} = props
  return (
    <DomGridPad
      padPressed={padPressed}
      active={true}
      rgb={length <= numberOfSteps ? Colours.orange : Colours.off}
    >
      <PushGridPad
        pad={pad}
        padPressed={padPressed}
        rgb={length <= numberOfSteps ? Colours.orange : Colours.off}
      />
    </DomGridPad>
  )
}

const mapStateToProps = (state, { trackId }) => ({
  numberOfSteps: trackSelector(state, trackId).numberOfSteps
})

const mapDispatchToProps = (dispatch, { length, trackId }) => {
  return {
    padPressed() {
      dispatch(changeNumberOfStepsTo(trackId, length))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternLengthPad)
