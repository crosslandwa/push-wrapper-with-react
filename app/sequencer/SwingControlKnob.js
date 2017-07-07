'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { changeSwingBy } from './actions'

const SwingControlKnob = props => (
  <ClickyDraggy {...props}>
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTurned(delta) {
      dispatch(changeSwingBy(delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwingControlKnob)
