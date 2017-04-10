'use strict'
const Push = require('push-wrapper')

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'

function loadPush() {
  return new Promise((resolve, reject) => navigator.requestMIDIAccess
    ? resolve(navigator.requestMIDIAccess({ sysex: true }))
    : reject('No SYSEX available!')
  ).then(Push.create_bound_to_web_midi_api, (err) => {
    console.error(err)
    return new Push({ send: bytes => { } })
  })
}

Promise.all([
  loadPush()
]).then(app)

function app([push]) {
  ReactDOM.render(
    <App push={push} />,
    document.getElementById('app')
  )
}
