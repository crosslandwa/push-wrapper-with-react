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
      this.props.pushButton.ledOff()
      return null
    }
    let index = this.state.colourIndex
    let colour = ['red', 'green', 'blue'][index]
    let rgb = [0, 0, 0]
    rgb[index] = 200
    this.props.pushButton.ledRGB(...rgb)
    return <div className={colour} >This button is {colour}</div>
  }

  componentDidMount() {
    const unsubscribePressedListener = this.props.pushButton.onPressed(this.handleClick)
    this.setState({ unsubscribePressedListener })
  }

  componentWillUnmount() {
    this.state.unsubscribePressedListener()
    this.props.pushButton.ledOff()
  }
}

export default PushButton
