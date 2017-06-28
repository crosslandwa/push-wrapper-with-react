'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { changeNumberOfStepsBy } from './actions'

const BpmControlKnob = ({ children, trackId, updateNumberOfSteps }) => (
  <div>
    {React.Children.map(children, (child) => React.cloneElement(
      child,
      { onTurned: delta => updateNumberOfSteps(trackId, delta) }
    ))}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateNumberOfSteps(trackId, delta) {
      dispatch(changeNumberOfStepsBy(trackId, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BpmControlKnob)
