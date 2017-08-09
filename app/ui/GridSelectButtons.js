'use strict'
import React from 'react'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { Colours } from '../push/colours'
import TrackSelectButton from '../voices/TrackSelectButton'
import KitSelectButtons from '../kits/KitSelectButtons'
import StepResetButtons from '../sequencer/StepResetButtons'
import VoiceResetButtons from '../voices/VoiceResetButtons'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'transparent'
}

const GridSelectButtons = ({deleteModifier, isStepSelected, trackIds, push}) => {
  let topRow
  if (isStepSelected) {
    topRow = <StepResetButtons style={style} buttons={push.channelSelectButtons()} />
  } else if (deleteModifier) {
    topRow = <VoiceResetButtons style={style} buttons={push.channelSelectButtons()} />
  } else {
    topRow = <KitSelectButtons style={style} buttons={push.channelSelectButtons()} />
  }

  return (
    <div style={style}>
      {topRow}
      {[...Array(8).keys()].map(index => (
        <TrackSelectButton
          key={trackIds[index]}
          button={push.gridSelectButtons()[index]}
          trackId={trackIds[index]}
        />
      ))}
    </div>
  )
}

export default GridSelectButtons
