'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { changeStepVelocityBy } from './actions'

const StepVelocityControl = props => (
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
      dispatch(changeStepVelocityBy(stepId, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepVelocityControl)
