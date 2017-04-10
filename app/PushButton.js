'use strict'
import React from 'react'

const colour = max => Math.floor(Math.random() * (2 + 1))

class PushButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {colourIndex: colour()}
  }

  handleClick() {
    this.setState(prevState => {
      let newColour = prevState.colourIndex
      while(prevState.colourIndex === newColour) {
        newColour = colour()
      }
      return {colourIndex: newColour}
    })
  }

  render() {
    if (!this.props.active) {
      this.props.pushButton.led_off()
      return null
    }
    let index = this.state.colourIndex
    let colour = ['red', 'green', 'blue'][index]
    let rgb = [0, 0, 0]
    rgb[index] = 200
    this.props.pushButton.led_rgb(...rgb)
    return <div className={colour} >This button is {colour}</div>
  }

  componentDidMount() {
    this.props.pushButton.on('pressed', this.handleClick)
  }

  componentWillUnmount() {
    this.props.pushButton.removeListener('pressed', this.handleClick)
    this.props.pushButton.led_off()
  }
}

export default PushButton
