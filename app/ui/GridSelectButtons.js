'use strict'
import React from 'react'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { Colours } from '../push/colours'
import TrackSelectButton from '../voices/TrackSelectButton'
import KitSelectButton from '../sequencer/KitSelectButton'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'transparent'
}

const GridSelectButtons = ({kitIds, trackIds, push}) => (
  <div style={style}>
    {[...Array(8).keys()].map(index => (
      <KitSelectButton
        key={index}
        button={push.channelSelectButtons()[index]}
        kitId={kitIds[index]}
      />
    ))}
    {[...Array(8).keys()].map(index => index < trackIds.length
      ? (
        <TrackSelectButton
          key={index}
          button={push.gridSelectButtons()[index]}
          trackId={trackIds[index]}
        />
      ) :  (
        <DomGridButton
          key={index}
          active={false}
          rgb={Colours.off}
        >
          <PushGridSelectButton
            button={push.gridSelectButtons()[index]}
            rgb={Colours.off}
          />
        </DomGridButton>
      )
    )}
  </div>
)

export default GridSelectButtons
