'use strict'
const Push = require('push-wrapper')

import React from 'react'
import ReactDOM from 'react-dom'

const random = max => Math.floor(Math.random() * (max + 1))

new Promise((resolve, reject) => navigator.requestMIDIAccess
  ? resolve(navigator.requestMIDIAccess({ sysex: true }))
  : reject('No SYSEX available!')
).then(Push.create_bound_to_web_midi_api, (err) => {
  console.error(err)
  return new Push({ send: bytes => { } })
})
.then(app)

class PushButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.newColour = this.newColour.bind(this);
    this.state = {colourIndex: this.newColour()}
    props.pushButton.on('pressed', this.handleClick)
  }

  newColour() {
    return random(2)
  }

  handleClick() {
    this.setState(prevState => {
      let newColour = prevState.colourIndex
      while(prevState.colourIndex === newColour) {
        newColour = this.newColour()
      }
      return {colourIndex: newColour}
    })
  }

  render() {
    let index = this.state.colourIndex
    let colour = ['red', 'green', 'blue'][index]
    let rgb = [0, 0, 0]
    rgb[index] = 200
    this.props.pushButton.led_rgb(...rgb)
    return <div className={colour} >This button is {colour}</div>
  }
}

function app(push) {
  ReactDOM.render(
    <PushButton pushButton={push.grid.x[1].y[1]} />,
    document.getElementById('app')
  );
}
