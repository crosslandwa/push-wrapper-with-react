'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { Colours } from '../push/colours'
import DomGridButton from '../push/DomGridButton'
import PushChannelSelectButton from '../push/PushChannelSelectButton'
import { resetDecay, resetFilterFrequency, resetPitch, resetVolume } from './actions'

const noop = () => {}

const VoiceResetButtons = ({buttons, resetDecay, resetFilter, resetPitch, resetVolume, style}) => (
  <div style={style} >
    {[resetPitch, noop, resetDecay, noop, noop, noop, resetFilter, resetVolume].map((action, index) => (
      <DomGridButton
        key={index}
        active={true}
        onPressed={action}
        rgb={Colours.red}
      >
        <PushChannelSelectButton
          button={buttons[index]}
          onPressed={action}
          rgb={Colours.red}
        />
      </DomGridButton>
    ))}
  </div>
)

const mapDispatchToProps = {
  resetDecay: resetDecay,
  resetFilter: resetFilterFrequency,
  resetPitch: resetPitch,
  resetVolume: resetVolume
}

export default connect(null, mapDispatchToProps)(VoiceResetButtons)
