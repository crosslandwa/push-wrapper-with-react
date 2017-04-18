'use strict'
import React from 'react'
import PushButton from './PushButton'
import DomGridPad from './DomGridPad'

const randomBetweenZeroAnd = x => Math.floor(Math.random() * (x + 1))
const activeIndex = randomBetweenZeroAnd(8)
const red = [200, 10, 0]
const green = [0, 200, 10]
const blue = [0, 10, 200]
const colours = [red, green, blue]
const colour = max => Math.floor(Math.random() * (2 + 1))


class Rainbow extends React.Component {
  constructor (props) {
    super(props)
    this.toggleRainbow = this.toggleRainbow.bind(this)
    this.state = {
      colours: [...Array(8).keys()].map(colour)
    }
  }

  toggleRainbow (index) {
    this.setState(prevState => {
      let newColours = prevState.colours.slice()
      while(prevState.colours[index] === newColours[index]) {
        newColours[index] = colour()
      }
      return {colours: newColours}
    })
  }

  render () {
    const {push} = this.props
    return (
      <div className='row'>
        {push.gridRow(0).map((pad, index) =>
          <PushButton
            key={index}
            active={activeIndex >= index}
            pushButton={pad}
          />
        )}
        {push.gridRow(0).map((pad, index) =>
          <DomGridPad
            key={index}
            active={true}
            padPressed={() => this.toggleRainbow(index)}
            rgb={colours[this.state.colours[index]]}
          />
        )}
      </div>
    )
  }
}

export default Rainbow
