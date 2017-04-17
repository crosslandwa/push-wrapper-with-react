'use strict'
const pushWrapper = require('push-wrapper')

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'

const loadPush = () => pushWrapper.webMIDIio()
  .catch(err => { console.error(err); return { inputPort: {}, outputPort: { send: () => {} } } })
  .then(({inputPort, outputPort}) => {
    const push = pushWrapper.push()
    inputPort.onmidimessage = event => push.midiFromHardware(event.data)
    push.onMidiToHardware(outputPort.send.bind(outputPort))
    return push
  })

Promise.all([
  loadPush()
]).then(app)

function app([push]) {
  ReactDOM.render(
    <App push={push} />,
    document.getElementById('app')
  )
}
