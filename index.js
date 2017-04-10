'use strict'
const Push = require('push-wrapper')
const context = new window.AudioContext()
const PlayerFactory = require('wac.sample-player')(context)

import React from 'react'
import ReactDOM from 'react-dom'
import Rainbow from './app/Rainbow'
import DrumPad from './app/DrumPad'
import PushButton from './app/PushButton'

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
  player.toMaster()
  push.grid.x[2].y[2].on('pressed', player.play)
  let pad = false
  push.grid.x[3].y[2].on('pressed', () => {
    pad = !pad
    render(push, player, pad)
  })
  render(push, player, pad)
}

function render(push, player, drumPad) {
  ReactDOM.render(
    <div>
      { drumPad ?
        <DrumPad pad={push.grid.x[1].y[2]} player={player} />
        : <PushButton active="true" pushButton={push.grid.x[1].y[2]} />
      }
      <Rainbow push={push} />
    </div>,
    document.getElementById('app')
  )
}
