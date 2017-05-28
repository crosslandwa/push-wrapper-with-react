const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
const players = {}

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

export function playSample (voice, midiPitch = 36, velocity = 100) {
  if (players[voice]) {
    players[voice].updatePlaybackRate(playbackRate(midiPitch))
    players[voice].play(midiGain(velocity))
  }
  return { type: 'PLAY_SAMPLE' }
}

function samplePlaying (voice, gain) {
  return { type: 'SAMPLE_PLAYING', velocity: gain.velocity(), voice }
}

export function loadSample (voice, url, sample) {
  return function (dispatch) {
    return players[voice]
    ? players[voice].loadResource(url)
    : PlayerFactory.forResource(url)
    .then(player => {
      players[voice] = player
      player.toMaster()
      player.on('started', gain => dispatch(samplePlaying(voice, gain)))
      player.on('stopped', () => dispatch(samplePlaying(voice, { velocity: () => 0 })))
    })
    .then(() => dispatch({ type: 'SAMPLE_LOADED', voice, sample }))
  } // TODO handle url load failure (does wac.sample-player reject promise correctly?)
}
