'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { updateVolume } from './actions'
import { voiceForTrack } from '../selectors'

const VolumeControl = props => {
  return (
    <ClickyDraggy {...props}>
      <DomKnob />
      <PushKnob {...props} />
    </ClickyDraggy>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onTurned: updateVolume
}, dispatch)

export default connect(null, mapDispatchToProps)(VolumeControl)
