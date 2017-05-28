const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
const players = {}

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

export function playSample (voice, rate = 1, velocity = 100) {
  if (players[voice]) {
    players[voice].updatePlaybackRate(rate)
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
