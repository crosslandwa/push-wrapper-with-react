'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { changeStepPitchBy } from './actions'

const StepPitchControl = props => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onTurned: changeStepPitchBy
}, dispatch)

export default connect(null, mapDispatchToProps)(StepPitchControl)
