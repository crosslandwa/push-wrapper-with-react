'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { Colours } from '../push/colours'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { resetSelectedStepsDecay, resetSelectedStepsPitch, resetSelectedStepsVelocity } from './stepsActions'

const noop = () => {}

const StepResetButtons = ({buttons, resetDecay, resetPitch, resetVelocity, style}) => (
  <div style={style} >
    {[resetPitch, noop, resetDecay, noop, noop, noop, noop, resetVelocity].map((action, index) => (
      <DomGridButton
        key={index}
        active={false}
        onPressed={action}
      >
        <PushGridSelectButton
          button={buttons[index]}
          padPressed={action}
        />
      </DomGridButton>
    ))}
  </div>
)

const mapDispatchToProps = {
  resetDecay: resetSelectedStepsDecay,
  resetPitch: resetSelectedStepsPitch,
  resetVelocity: resetSelectedStepsVelocity
}

export default connect(null, mapDispatchToProps)(StepResetButtons)
