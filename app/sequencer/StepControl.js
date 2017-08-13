'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { turnStepsOff, turnStepOn, selectStep, unselectStep } from './actions'
import StepDisplay from './StepDisplay'

const timeThreshold = 200

class StepControl extends React.Component {
  constructor (props) {
    super(props)
    this.pressed = this.pressed.bind(this)
    this.released = this.released.bind(this)
    this.state = { selectedTime: {}, held: {} }
  }

  pressed (stepNumber, stepId) {
    const selectedStepId = stepId
      ? stepId
      : this.props.turnStepOn(stepNumber) // omitted optional pitch, velocity

    setTimeout(() => {
      if (this.state.held[selectedStepId]) {
        this.props.selectStep(selectedStepId)
      }
    }, timeThreshold)

    this.setState({
      held: Object.assign({}, this.state.held, { [selectedStepId]: true }),
      selectedTime: Object.assign({}, this.state.selectedTime, { [selectedStepId]: new Date().getTime() - (stepId ? 0 : timeThreshold) })
    })
  }

  released (stepId) {
    this.props.unselectStep(stepId)
    const timeHeld = new Date().getTime() - (this.state.selectedTime[stepId] || 0)
    if (timeHeld < timeThreshold) {
      this.props.turnStepOff(stepId)
    }
    this.setState({
      held: Object.assign({}, this.state.held, { [stepId]: false })
    })
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
      return dispatch(turnStepsOff([stepId]))
    },
    selectStep (stepId) {
      dispatch(selectStep(stepId))
    },
    unselectStep (stepId) {
      dispatch(unselectStep(stepId))
    }
  })
)(StepControl)
