'use strict'
import React from 'react'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { Colours } from '../push/colours'
import TrackSelectButton from '../voices/TrackSelectButton'
import KitSelectButtons from '../kits/KitSelectButtons'
import StepResetButtons from '../sequencer/StepResetButtons'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'transparent'
}

const GridSelectButtons = ({isStepSelected, kitIds, trackIds, push}) => {
  return (
    <div style={style}>
      {isStepSelected
        ? <StepResetButtons style={style} buttons={push.channelSelectButtons()} />
        : <KitSelectButtons style={style} buttons={push.channelSelectButtons()} kitIds={kitIds} />
      }
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
