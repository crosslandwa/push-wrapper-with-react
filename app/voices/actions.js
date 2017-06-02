const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
const players = {}

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

export function playSample (trackId, {pitch, velocity}) {
  return (dispatch, getState) => {
    const { entities: { voices, samples, tracks } } = getState()
    const voiceId = tracks.byId[trackId].voiceId
    const voice = voices.byId[voiceId]
    const sampleId = voice.sampleId
    if (players[sampleId]) {
      players[sampleId].updatePlaybackRate(playbackRate(pitch || voice.pitch))
      players[sampleId].play(midiGain(velocity))
    }
    return { type: 'PLAY_SAMPLE' }
  }
}

function samplePlaying (voiceId, gain) {
  return { type: 'VOICE_PLAYING', velocity: gain.velocity(), id: voiceId }
}

export function loadSample (url, sample) {
  return function (dispatch, getState) {
    const {entities: {samples: {allIds}}} = getState()
    const voiceId = `voice${allIds.length}` // TODO hack - should associate player -> voiceId on initialising voice
    const id = `sample${allIds.length}`
    dispatch({ type: 'SAMPLE_LOADED', id, url, sample, loaded: false })
    return players[id]
    ? players[id].loadResource(url)
    : PlayerFactory.forResource(url)
    .then(player => {
      players[id] = player
      player.toMaster()
      player.on('started', gain => dispatch(samplePlaying(voiceId, gain)))
      player.on('stopped', () => dispatch(samplePlaying(voiceId, { velocity: () => 0 })))
    })
    .then(() => dispatch({ type: 'SAMPLE_LOADED', id, url, sample, loaded: true }))
    .then(() => id)
  } // TODO handle url load failure (does wac.sample-player reject promise correctly?)
}

export function createVoice(sampleId) {
  return (dispatch, getState) => {
    const { entities: { voices: { allIds } } } = getState()
    const id = `voice${allIds.length}`
    dispatch({ type: 'VOICE_CREATE', id, sampleId })
    return id
  }
}
