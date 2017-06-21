'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { changeBpmBy } from './actions'

const BpmControlKnob = ({ children, updateBpm }) => (
  <div>
    {React.Children.map(children, (child) => React.cloneElement(
      child,
      { onTurned: updateBpm }
    ))}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateBpm(delta) {
      dispatch(changeBpmBy(delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BpmControlKnob)
