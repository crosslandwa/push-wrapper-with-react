'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'
import { connect } from 'react-redux'

class ToggleRow extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      on: Array(8).fill(false)
    }
  }

  toggle (index) {
    this.setState(prevState => {
      let on = prevState.on.slice()
      on[index] = !on[index]
      return { on }
    })
  }

  render () {
    const {gridRow, onClick, on} = this.props
    return (
      <div className='toggleRow'>
        {gridRow().map((pad, index) => (
          <PushGridPad
            key={index}
            velocity={on[index] ? 120 : 0}
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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: index => {
    dispatch({ type: 'TOGGLE', index })
  }
})

export default connect(
  ({ toggles }) => ({ on: toggles }), // mapStateToProps
  mapDispatchToProps
)(ToggleRow)
