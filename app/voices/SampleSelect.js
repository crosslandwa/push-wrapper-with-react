'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { switchSample } from './actions'

const SampleSelect = props => {
  const {trackId, changeSample, nextSampleId, prevSampleId} = props
  return (
    <div style={{display: 'inline-block'}}>
      {React.Children.map(props.children, (child) => React.cloneElement(
        child,
        { onTurned: delta => changeSample(trackId, delta > 0 ? nextSampleId : prevSampleId) }
      ))}
    </div>
  )
}

const mapStateToProps = ({entities: {voices, tracks, samples}}, { trackId }) => {
  const voiceId = tracks.byId[trackId].voiceId
  const sampleId = voices.byId[voiceId].sampleId
  const index = samples.allIds.indexOf(sampleId)
  const isFirstSample = index === 0
  const isLastSample = index === (samples.allIds.length - 1)

  return {
    nextSampleId: samples.allIds[isLastSample ? 0 : index + 1],
    prevSampleId: samples.allIds[isFirstSample ? samples.allIds.length - 1 : index - 1]
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
