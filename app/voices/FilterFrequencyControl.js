'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { updateFilterFrequency } from './actions'

const FilterFrequencyControl = props => (
  <ClickyDraggy {...props}>
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, { trackIds }) => {
  return {
    onTurned(delta) {
      dispatch(updateFilterFrequency(trackIds, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterFrequencyControl)
