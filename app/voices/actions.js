import { sampleBuffer } from '../samples/actions'

const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
let players = []

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

export function playVoiceForTrack (trackId, {pitch, velocity}) {
  return (dispatch, getState) => {
    const { entities: { patterns, voices, samples, tracks }, sequencer: { patternId } } = getState()
    const voiceId = tracks.byId[trackId].voiceId
    const voice = voices.byId[voiceId]
    const playerIndex = patterns.byId[patternId].trackIds.indexOf(trackId)
    players[playerIndex]
      .updatePlaybackRate(playbackRate(pitch || voice.pitch))
      .play(midiGain(velocity))
  }
}

function voicePlaying (voiceId, gain) {
  return { type: 'VOICE_PLAYING', velocity: gain.velocity(), id: voiceId }
}

export function initialisePlayers () {
  const emptyBuffer = context.createBuffer(1, context.sampleRate / 1000, context.sampleRate)
  return (dispatch, getState) => {
    return Promise.all(
      [...Array(8).keys()].map(index => PlayerFactory.withBuffer(emptyBuffer))
    ).then(newPlayers => {
      players = newPlayers
      players.forEach((player, index) => {
        player.toMaster()
        player.on('started', gain => {
          const { entities: { patterns, tracks }, sequencer: { patternId }} = getState()
          const trackId = patterns.byId[patternId].trackIds[index]
          const voiceId = tracks.byId[trackId].voiceId
          dispatch(voicePlaying(voiceId, gain))
        })
        player.on('stopped', () => {
          const { entities: { patterns, tracks }, sequencer: { patternId }} = getState()
          const trackId = patterns.byId[patternId].trackIds[index]
          const voiceId = tracks.byId[trackId].voiceId
          dispatch(voicePlaying(voiceId, { velocity: () => 0 }))
        })
      })
    })
  }
}

export function switchPlayerToTrack (trackId) {
  return (dispatch, getState) => {
    const { entities: { patterns, tracks, voices }, sequencer: { patternId } } = getState()
    const index = patterns.byId[patternId].trackIds.indexOf(trackId)
    const voiceId = tracks.byId[trackId].voiceId
    const sampleId = voices.byId[voiceId].sampleId
    players[index].setBuffer(sampleBuffer(sampleId))
  }
}
