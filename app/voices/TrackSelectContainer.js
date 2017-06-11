'use strict'
import React from 'react'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'

const TrackSelectContainer = ({ velocity = 0, padPressed, padReleased, pad}) => (
  <div style={{display: 'inline-block'}} >
    <DomGridPad
      padPressed={padPressed}
      active={(velocity > 0)}
      rgb={Colours.turquoise}
    />
    <PushGridPad
      rgb={velocity > 0 ? Colours.turquoise : Colours.off}
      pad={pad}
      padPressed={padPressed}
    />
  </div>
)

export default TrackSelectContainer
