'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { updateDecay } from './actions'

const DecayKnob = props => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onTurned: updateDecay
}, dispatch)

export default connect(null, mapDispatchToProps)(DecayKnob)
