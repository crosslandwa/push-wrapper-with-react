'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { Colours } from '../push/colours'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { resetSelectedStepsDecay, resetSelectedStepsPitch } from './stepsActions'

const noop = () => {}

const StepResetButtons = ({buttons, resetDecay, resetPitch, style}) => (
  <div style={style} >
    {[resetPitch, noop, resetDecay, noop, noop, noop, noop, noop].map((action, index) => (
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
  resetPitch: resetSelectedStepsPitch
}

export default connect(null, mapDispatchToProps)(StepResetButtons)
