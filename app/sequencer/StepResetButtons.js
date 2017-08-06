'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { Colours } from '../push/colours'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { resetSelectedStepsPitch } from './stepsActions'

const StepResetButtons = ({buttons, resetPitch, style}) => (
  <div style={style} >
    {[
      <DomGridButton
        key='resetPitch'
        active={false}
        onPressed={resetPitch}
      >
        <PushGridSelectButton
          button={buttons[0]}
          padPressed={resetPitch}
        />
      </DomGridButton>
    ].concat([...Array(7).keys()].map(index => (
      <DomGridButton
        key={index + 1}
        active={false}
        rgb={Colours.off}
      >
        <PushGridSelectButton
          button={buttons[index + 1]}
          rgb={Colours.off}
        />
      </DomGridButton>
    )))}
  </div>
)

const mapDispatchToProps = {
  resetPitch: resetSelectedStepsPitch
}

export default connect(null, mapDispatchToProps)(StepResetButtons)
