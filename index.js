'use strict'
const Push = require('push-wrapper')

import React from 'react'
import ReactDOM from 'react-dom'
import Rainbow from './app/Rainbow'

new Promise((resolve, reject) => navigator.requestMIDIAccess
  ? resolve(navigator.requestMIDIAccess({ sysex: true }))
  : reject('No SYSEX available!')
).then(Push.create_bound_to_web_midi_api, (err) => {
  console.error(err)
  return new Push({ send: bytes => { } })
})
.then(app)

function app(push) {
  setInterval(() => {
    ReactDOM.render(
      <Rainbow push={push} />,
      document.getElementById('app')
    );

  }, 1000)
}
