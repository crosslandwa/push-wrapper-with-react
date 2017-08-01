'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { changeStepVelocityBy } from './actions'

const StepVelocityControl = props => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onTurned: changeStepVelocityBy
}, dispatch)

export default connect(null, mapDispatchToProps)(StepVelocityControl)
