'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { updatePitch } from './actions'

const PitchControl = props => {
  const {trackId, updatePitch} = props
  return (
    <div style={{display: 'inline-block'}}>
      {React.Children.map(props.children, (child) => React.cloneElement(
        child,
        { onTurned: delta => updatePitch(trackId, delta) }
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePitch(trackId, delta) {
      dispatch(updatePitch(trackId, delta))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PitchControl)
