'use strict'
import React from 'react'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { Colours } from '../push/colours'
import TrackSelectButton from '../voices/TrackSelectButton'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'transparent'
}

const GridSelectButtons = ({trackIds, push}) => (
  <div style={style}>
    {[...Array(8).keys()].map(index => <DomGridButton key={index} />)}
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
