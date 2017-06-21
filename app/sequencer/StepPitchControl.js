'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { changeStepPitchBy } from './actions'

const StepPitchControl = props => {
  const {stepId, updatePitch} = props
  return (
    <div>
      {React.Children.map(props.children, (child) => React.cloneElement(
        child,
        { onTurned: delta => updatePitch(stepId, delta) }
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePitch(stepId, delta) {
      dispatch(changeStepPitchBy(stepId, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepPitchControl)
