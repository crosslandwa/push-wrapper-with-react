'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { changeNumberOfStepsBy } from './actions'

const NumberOfStepsKnob = props => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)
const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, { trackId }) => {
  return {
    onTurned(delta) {
      dispatch(changeNumberOfStepsBy(trackId, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberOfStepsKnob)
