'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { turnStepOff, turnStepOn, selectStep, unselectStep } from './actions'
import StepDisplay from './StepDisplay'

const timeThreshold = 200
const noop = () => {}

class StepControl extends React.Component {
  constructor (props) {
    super(props)
    this.pressed = this.pressed.bind(this)
    this.released = this.released.bind(this)
    this.state = { cancel: noop }
  }

  pressed (stepNumber, stepId) {
    const selectedStepId = stepId
      ? stepId
      : this.props.turnStepOn(stepNumber) // omitted optional pitch, velocity

    const handle = setTimeout(() => this.props.selectStep(selectedStepId), timeThreshold)

    this.setState({
      cancel: () => clearTimeout(handle),
      selectedTime: new Date().getTime() - (stepId ? 0 : timeThreshold)
    })
  }

  released (stepId) {
    this.state.cancel()
    this.props.unselectStep(stepId)
    const timeHeld = new Date().getTime() - this.state.selectedTime
    if (timeHeld < timeThreshold) {
      this.props.turnStepOff(stepId)
    }
  }

  render () {
    return <StepDisplay {...this.props} onClick={this.pressed} onRelease={this.released} />
  }
}

export default connect(
  null,
  (dispatch, { trackId }) => ({
    turnStepOn (stepNumber) {
      return dispatch(turnStepOn(trackId, stepNumber))
    },
    turnStepOff (stepId) {
      return dispatch(turnStepOff(stepId))
    },
    selectStep (stepId) {
      dispatch(selectStep(stepId))
    },
    unselectStep (stepId) {
      dispatch(unselectStep(stepId))
    }
  })
)(StepControl)
