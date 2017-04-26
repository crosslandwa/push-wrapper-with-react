'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'

const randomBetweenZeroAnd = x => Math.floor(Math.random() * (x + 1))
const activeIndex = randomBetweenZeroAnd(8)
const red = [200, 10, 0]
const green = [0, 200, 10]
const blue = [0, 10, 200]
const colours = [red, green, blue]
const colour = max => Math.floor(Math.random() * (2 + 1))


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
    const {gridRow} = this.props
    return (
      <div className='toggleRow'>
        {gridRow().map((pad, index) => (
          <PushGridPad
            key={index}
            velocity={this.state.on[index] ? 120 : 0}
            pad={pad}
            padPressed={() => this.toggle(index)}
          />
        ))}
        {gridRow().map((pad, index) => (
          <DomGridPad
            key={index}
            active={this.state.on[index]}
            padPressed={() => this.toggle(index)}
          />
        ))}
      </div>
    )
  }
}

export default ToggleRow
