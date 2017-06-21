'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { changeStepVelocityBy } from './actions'

const StepVelocityControl = props => {
  const {stepId, updateVelocity} = props
  return (
    <div>
      {React.Children.map(props.children, (child) => React.cloneElement(
        child,
        { onTurned: delta => updateVelocity(stepId, delta) }
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateVelocity(stepId, delta) {
      dispatch(changeStepVelocityBy(stepId, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepVelocityControl)
