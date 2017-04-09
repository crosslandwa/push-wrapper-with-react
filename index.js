'use strict'
const Push = require('push-wrapper')
const context = new window.AudioContext()
const PlayerFactory = require('wac.sample-player')(context)

import React from 'react'
import ReactDOM from 'react-dom'
import Rainbow from './app/Rainbow'
import DrumPad from './app/DrumPad'

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
  loadPush(),
  PlayerFactory.forResource('Kick.mp3')
]).then(app)

function app([push, player]) {
  ReactDOM.render(
    <div>
      <DrumPad pad={push.grid.x[1].y[2]} player={player} />
      <Rainbow push={push} />
    </div>,
    document.getElementById('app')
  )
}
