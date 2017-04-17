'use strict'
const pushWrapper = require('push-wrapper')

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'

function loadPush() {
  const push = pushWrapper.push()
  if (navigator && navigator.requestMIDIAccess) {
    return navigator.requestMIDIAccess({ sysex: true }).then(midiAccess => {
      const inputs = Array.from(midiAccess.inputs.values())
      const outputs = Array.from(midiAccess.outputs.values())
      const userPort = ports => ports.filter(port => port.name === 'Ableton Push User Port')[0] || undefined

      const input = userPort(inputs)
      if (input) {
        console.log('Binding MIDI input to ' + input.name)
        input.onmidimessage = event => push.midiFromHardware(event.data)
      }
      const output = userPort(outputs)
      if (output) {
        console.log('Binding MIDI output to ' + output.name)
        push.onMidiToHardware(output.send.bind(output))
      }
      return push
    })
  }
  return Promise.reject('Web MIDI API not supported by this browser!')
}

Promise.all([
  loadPush().catch(err => {console.log(err); return Promise.resolve(pushWrapper.push())})
]).then(app)

function app([push]) {
  ReactDOM.render(
    <App push={push} />,
    document.getElementById('app')
  )
}
