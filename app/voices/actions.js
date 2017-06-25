import { sampleBuffer } from '../samples/actions'
import { currentPattern, sampleForTrack, voiceForTrack } from '../selectors'
import Player from '../player'

const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
let players = []


export function playVoiceForTrack (trackId, {pitch, velocity}) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    const playerIndex = currentPattern(getState()).trackIds.indexOf(trackId)
    players[playerIndex].play(pitch || voice.pitch, velocity)
  }
}

function voicePlaying (voiceId, velocity) {
  return { type: 'VOICE_PLAYING', velocity, id: voiceId }
}

export function initialisePlayers () {
  return (dispatch, getState) => {
    return Promise.all(
      [...Array(8).keys()].map(index => new Player())
    ).then(newPlayers => {
      players = newPlayers
      players.forEach((player, index) => {
        player.onStarted(velocity => {
          const trackId = currentPattern(getState()).trackIds[index]
          const voiceId = voiceForTrack(getState(), trackId).id
          dispatch(voicePlaying(voiceId, velocity))
        })
        player.onStopped(() => {
          const trackId = currentPattern(getState()).trackIds[index]
          const voiceId = voiceForTrack(getState(), trackId).id
          dispatch(voicePlaying(voiceId, 0))
        })
      })
    })
  }
}

export function switchPlayerToTrack (trackId) {
  return (dispatch, getState) => {
    const index = currentPattern(getState()).trackIds.indexOf(trackId)
    const sample = sampleForTrack(getState(), trackId)
    return players[index].changeSample(sampleBuffer(sample.id))
  }
}

export function switchSample(trackId, sampleId) {
  return (dispatch, getState) => {
    const voiceId = voiceForTrack(getState(), trackId).id
    dispatch({ type: 'VOICE_SWITCH_SAMPLE', voiceId, sampleId })
    dispatch(switchPlayerToTrack(trackId))
  }
}

export function updatePitch(trackId, delta) {
  return (dispatch, getState) => {
    const voiceId = voiceForTrack(getState(), trackId).id
    dispatch({ type: 'VOICE_UPDATE_PITCH', voiceId, delta })
  }
}
