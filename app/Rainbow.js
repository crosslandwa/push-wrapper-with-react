'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'
import { connect } from 'react-redux'
import { toggleRainbow } from './actions'

const red = [200, 10, 0]
const green = [0, 200, 10]
const blue = [0, 10, 200]
const colours = [red, green, blue]

const Rainbow = ({ row, colourIndices, onClick }) => (
  <div className='rainbow'>
    {row().map((pad, index) =>
      <PushGridPad
        key={index}
        velocity={127}
        pad={pad}
        padPressed={() => onClick(index)}
        rgb={colours[colourIndices[index]]}
      />
    )}
    {row().map((pad, index) =>
      <DomGridPad
        key={index}
        active={true}
        padPressed={() => onClick(index)}
        rgb={colours[colourIndices[index]]}
      />
    )}
  </div>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick (index) {
    dispatch(toggleRainbow(index))
  }
})

export default connect(
  ({ rainbow }) => ({ colourIndices: rainbow }),
  mapDispatchToProps
)(Rainbow)
