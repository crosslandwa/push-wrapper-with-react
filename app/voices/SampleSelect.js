'use strict'
import React from 'react'
import { connect } from 'react-redux'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import { switchSample } from './actions'
import { startSampleSelection, stopSampleSelection } from '../ui/actions'
import { currentSample, sampleIds } from '../selectors'

const SampleSelect = props => {
  const {trackId, changeSample, nextSampleId, prevSampleId, onPressed, onReleased} = props
  const onTurned = delta => changeSample(trackId, delta > 0 ? nextSampleId : prevSampleId)
  return (
    <ClickyDraggy {...props} onTurned={onTurned} onPressed={onPressed} onReleased={onReleased} >
      <DomKnob />
      <PushKnob {...props} onTurned={onTurned} onPressed={onPressed} onReleased={onReleased} />
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeSample(trackId, sampleId) {
      dispatch(switchSample(trackId, sampleId))
    },
    onPressed() {
      dispatch(startSampleSelection())
    },
    onReleased() {
      dispatch(stopSampleSelection())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleSelect)
