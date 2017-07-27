'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { switchSample } from './actions'
import { startSampleSelection, stopSampleSelection } from '../ui/actions'
import { currentSample, sampleIds } from '../selectors'

const SampleSelect = props => {
  const {trackId, nextSampleId, prevSampleId} = props
  const onTurned = delta => props.switchSample(trackId, delta > 0 ? nextSampleId : prevSampleId)
  return (
    <ClickyDraggy {...props} onTurned={onTurned} onPressed={props.startSampleSelection} onReleased={props.stopSampleSelection} >
      <DomKnob />
      <PushKnob {...props} onTurned={onTurned} onPressed={props.startSampleSelection} onReleased={props.stopSampleSelection} />
    </ClickyDraggy>
  )
}

const mapStateToProps = (state, { trackId }) => {
  const allSampleIds = sampleIds(state)
  const sampleId = currentSample(state).id
  const index = allSampleIds.indexOf(sampleId)
  const isFirstSample = index === 0
  const isLastSample = index === (allSampleIds.length - 1)

  return {
    nextSampleId: allSampleIds[isLastSample ? 0 : index + 1],
    prevSampleId: allSampleIds[isFirstSample ? allSampleIds.length - 1 : index - 1]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  switchSample,
  startSampleSelection,
  stopSampleSelection
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SampleSelect)
