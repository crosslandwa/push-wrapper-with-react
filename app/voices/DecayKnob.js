'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { updateDecay } from './actions'

const DecayKnob = props => {
  const {trackId, updateDecay} = props
  return (
    <div>
      {React.Children.map(props.children, (child) => React.cloneElement(
        child,
        { onTurned: delta => updateDecay(trackId, delta) }
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateDecay(trackId, delta) {
      dispatch(updateDecay(trackId, delta))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecayKnob)
