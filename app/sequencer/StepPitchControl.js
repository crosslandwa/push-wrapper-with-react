'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { changeStepPitchBy } from './actions'

const StepPitchControl = props => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, { stepId }) => {
  return {
    onTurned(delta) {
      dispatch(changeStepPitchBy(stepId, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepPitchControl)
