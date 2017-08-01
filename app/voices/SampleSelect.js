'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { switchSample } from './actions'
import { startSampleSelection, stopSampleSelection } from '../ui/actions'

const SampleSelect = props => (
  <ClickyDraggy {...props} >
    <DomKnob />
    <PushKnob {...props} />
  </ClickyDraggy>
)

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  onTurned: switchSample,
  onPressed: startSampleSelection,
  onReleased: stopSampleSelection
}, dispatch)

export default connect(null, mapDispatchToProps)(SampleSelect)
