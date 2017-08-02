'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { turnStepOff, turnStepOn, selectStep, unselectStep } from './actions'
import StepDisplay from './StepDisplay'


class StepControl extends React.Component {
  constructor(props) {
    super(props)
    this.pressed = this.pressed.bind(this)
    this.released = this.released.bind(this)
    this.state = {}
  }

  pressed(stepNumber, stepId) {
    let selectedStepId = stepId
    let time = new Date().getTime()
    if (!stepId) {
      selectedStepId = this.props.turnStepOn(stepNumber) // omitted optional pitch, velocity
      time = time - 201
    }
    this.props.selectStep(selectedStepId)
    this.setState({ selectedTime: time })
  }

  released(stepId) {
    const now = new Date().getTime()
    this.props.unselectStep(stepId)
    if ((now - this.state.selectedTime) < 200) {
      this.props.turnStepOff(stepId)
    }
  }

  render() {
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
    },

    // OLD WAYS
    onClick (stepNumber, stepId) {
      let selectedStepId = stepId
      if (!stepId) {
        selectedStepId = dispatch(turnStepOn(trackId, stepNumber)) // omitted optional pitch, velocity
      }
      dispatch(selectStep(selectedStepId))
    },
    onRelease (stepId) {
      dispatch(unselectStep(stepId))
    }
  })
)(StepControl)
