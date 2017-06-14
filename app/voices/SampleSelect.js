'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { switchSample } from './actions'
import { currentSample, sampleIds } from '../selectors'

const SampleSelect = props => {
  const {trackId, changeSample, nextSampleId, prevSampleId} = props
  return (
    <div>
      {React.Children.map(props.children, (child) => React.cloneElement(
        child,
        { onTurned: delta => changeSample(trackId, delta > 0 ? nextSampleId : prevSampleId) }
      ))}
    </div>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleSelect)
