'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { updatePitch } from './actions'

const PitchControl = props => (
  <ClickyDraggy {...props}>
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, { trackId }) => {
  return {
    onTurned(delta) {
      dispatch(updatePitch(trackId, delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PitchControl)
