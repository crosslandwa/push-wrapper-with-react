'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'
import { connect } from 'react-redux'
import { toggleToggles } from './actions'

const ToggleRow = ({gridRow, onClick, on}) => (
  <div className='toggleRow'>
    {gridRow().map((pad, index) => (
      <PushGridPad
        key={index}
        velocity={on[index] ? 92 : 0}
        pad={pad}
        padPressed={() => onClick(index)}
      />
    ))}
    {gridRow().map((pad, index) => (
      <DomGridPad
        key={index}
        active={on[index]}
        padPressed={() => onClick(index)}
      />
    ))}
  </div>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick (index) {
    dispatch(toggleToggles(index))
  }
})

export default connect(
  ({ toggles }) => ({ on: toggles }), // mapStateToProps
  mapDispatchToProps
)(ToggleRow)
